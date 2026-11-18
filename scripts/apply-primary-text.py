#!/usr/bin/env python3
"""按「--primary 是色块、--primary-text 是文字」的角色规则，全树修正 text-primary。

为什么需要这个脚本
------------------
强调色只有一支绿，浅色模式下分两档明度：

  --primary       oklch(0.86 0.22 145)  #5ef56d  亮绿 → 只当**色块**（按钮底、边框、装饰）
  --primary-text  oklch(0.52 0.12 145)  #357a3a  深绿 → 当**文字**（链接、强调、序号、图标）

深色模式下两者取值相同（都是 oklch(0.86 0.22 145)），所以把文字从
text-primary 换成 text-primary-text，**深色观感一个像素都不变**。

浅色模式下亮绿当文字只有 1.34:1（WCAG 正文需 ≥4.5:1）——纸白底上等于隐形。
所以凡是「自身着色」的文字/图标，无论常驻还是 hover 瞬时态，都必须用
text-primary-text。

不被改动的
----------
  text-primary-foreground   绿底上的文字（--primary-foreground 是深绿，13.17:1）✓
  bg-primary / border-primary / ring-primary / bg-primary/10
                            这些是色块与装饰，本来就该用亮绿 ✓

用法
----
  python3 scripts/apply-primary-text.py          # 就地修正（幂等）
  python3 scripts/apply-primary-text.py --check  # 只检查，残留则退出码 1
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "src"

# text-primary 后面不能跟 -（避免误伤 text-primary-foreground / text-primary-text）
# 前面同样不能是 - 或单词字符（避免误伤 --color-primary 之类）
TEXT_PRIMARY = re.compile(r"(?<![\w-])text-primary(?![\w-])")


def iter_sources():
    for path in sorted(ROOT.rglob("*.ts")):
        yield path
    for path in sorted(ROOT.rglob("*.tsx")):
        yield path


def main():
    check_only = "--check" in sys.argv

    changed_files = []
    total_hits = 0
    leftovers = []

    for path in iter_sources():
        src = path.read_text(encoding="utf-8")
        hits = TEXT_PRIMARY.findall(src)
        if not hits:
            continue
        total_hits += len(hits)
        if check_only:
            leftovers.append((path.relative_to(ROOT.parent), len(hits)))
            continue
        out = TEXT_PRIMARY.sub("text-primary-text", src)
        if out != src:
            # 本机沙箱禁 rename/unlink，sed -i 也走临时文件+rename，
            # 所以用「读 → 改 → 原地写回」。
            path.write_text(out, encoding="utf-8")
            changed_files.append((path.relative_to(ROOT.parent), len(hits)))

    if check_only:
        if leftovers:
            print("仍残留 text-primary 的文件：")
            for rel, n in leftovers:
                print("  %s (%d 处)" % (rel, n))
            return 1
        print("OK：全树已无裸 text-primary（文字角色全部走 --primary-text）")
        return 0

    if not changed_files:
        print("无需修改：全树已符合角色规则（幂等）")
        return 0

    print("修正 %d 处 text-primary → text-primary-text：" % total_hits)
    for rel, n in changed_files:
        print("  %-40s %d 处" % (rel, n))
    print("\n深色模式观感不变（--primary-text 与 --primary 同值）；浅色模式从 1.34:1 提升到 4.94:1")
    return 0


if __name__ == "__main__":
    sys.exit(main())
