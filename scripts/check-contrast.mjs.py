#!/usr/bin/env python3
"""oklch → sRGB → WCAG 对比度，用来定浅色模式的强调色档位。

规则：
  --primary       作色块（按钮底色、边框、装饰），配 --primary-foreground 文字
  --primary-text  作文字（链接、正文强调、小字），必须 ≥ 4.5:1（正文）/ 3:1（大字）
"""
import math


def oklch_to_srgb(L, C, h):
    a = C * math.cos(math.radians(h))
    b = C * math.sin(math.radians(h))
    l_ = L + 0.3963377774 * a + 0.2158037573 * b
    m_ = L - 0.1055613458 * a - 0.0638541728 * b
    s_ = L - 0.0894841775 * a - 1.2914855480 * b
    l, m, s = l_**3, m_**3, s_**3
    r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
    g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
    bb = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
    out = []
    for c in (r, g, bb):
        c = max(0.0, min(1.0, c))
        out.append(12.92 * c if c <= 0.0031308 else 1.055 * c ** (1 / 2.4) - 0.055)
    return out


def lum(rgb):
    def ch(c):
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4
    r, g, b = (ch(x) for x in rgb)
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def ratio(c1, c2):
    l1, l2 = lum(c1), lum(c2)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)


def hexs(rgb):
    return "#" + "".join("%02x" % round(x * 255) for x in rgb)


DARK_BG = oklch_to_srgb(0.16, 0.005, 60)
DARK_FG = oklch_to_srgb(0.95, 0.02, 80)
GREEN = oklch_to_srgb(0.86, 0.22, 145)

print("=== 现状（深色）核对 ===")
print("  正文 --foreground on --background : %.2f:1" % ratio(DARK_FG, DARK_BG))
print("  强调 --primary on --background     : %.2f:1  (亮绿当文字，当前就偏低)" % ratio(GREEN, DARK_BG))
print()

# 浅色模式的底与字
LIGHT_BG = oklch_to_srgb(0.98, 0.004, 80)
LIGHT_FG = oklch_to_srgb(0.22, 0.012, 70)
print("=== 浅色底色候选 ===")
for L, C, h in [(0.98, 0.004, 80), (0.975, 0.005, 80), (0.96, 0.006, 80)]:
    bg = oklch_to_srgb(L, C, h)
    print("  bg oklch(%.3f %.3f %d) %s  vs 正文 oklch(0.22 0.012 70): %.2f:1"
          % (L, C, h, hexs(bg), ratio(LIGHT_FG, bg)))
print()

print("=== 浅色下 --primary-text 候选（对 bg oklch(0.98 0.004 80)，需 ≥ 4.5:1）===")
print("  %-28s %-9s %s" % ("值", "hex", "对比度"))
best = []
for L in [0.40, 0.45, 0.50, 0.52, 0.55, 0.58, 0.60, 0.62]:
    for C in [0.12, 0.14, 0.16, 0.18]:
        c = oklch_to_srgb(L, C, 145)
        r = ratio(c, LIGHT_BG)
        flag = "  <= 正文达标" if r >= 4.5 else ""
        if L in (0.45, 0.50, 0.52, 0.55, 0.58):
            print("  oklch(%.2f %.2f 145)%s %s  %.2f:1%s"
                  % (L, C, " " * 10, hexs(c), r, flag))
        if r >= 4.5:
            best.append((L, C, r, hexs(c)))
if best:
    # 取「刚好达标且明度最高」的一档 —— 尽量保留绿的鲜亮感
    pick = sorted(best, key=lambda x: (-x[0], x[1]))[0]
    print("\n  推荐 --primary-text: oklch(%.2f %.2f 145)  %s  %.2f:1"
          % (pick[0], pick[1], pick[3], pick[2]))

print()
print("=== 浅色下 --primary 作色块 + --primary-foreground 文字 ===")
for L, C in [(0.86, 0.22), (0.90, 0.20), (0.93, 0.17)]:
    bg = oklch_to_srgb(L, C, 145)
    fg = oklch_to_srgb(0.18, 0.01, 145)
    print("  oklch(%.2f %.2f 145) %s  配 oklch(0.18 0.01 145): %.2f:1"
          % (L, C, hexs(bg), ratio(fg, bg)))
