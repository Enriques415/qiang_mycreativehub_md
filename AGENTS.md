# AGENTS.md — 数字旷野 / My Creative Hub

> 给任何 AI agent 的开工须知。**动手前先读完这一页**，它挡的是本仓库最贵的一类错误。
> 人类读者看 `README.md`（内容与工作流）和 `DESIGN.md`（视觉规范）。

## 这是什么

Jamstack 静态站：React 19 + Vite 7 + TanStack Router/Start + Tailwind 4 + shadcn/ui + TypeScript 5。
内容是本地 Markdown，**构建期**编译成 `data/*.json`，产物提交进仓库。纯静态，无后端。

---

## 三条硬规则

### 1. `content/writings/` 只有一个写入者 —— 飞书同步，不是你

`content/writings/*.md` 由**远端那台 Linux 机器**上的飞书多维表格同步脚本推送。它用 GitHub API 直接推覆盖提交、
**从不做 merge**，所以它永远赢、也永远不报冲突。你在本地往同一目录推，就是两个写入者互相覆盖，且没有任何一方会提示。

- 本地只推代码：`git add src/ scripts/ ...` 然后提交。
- `.githooks/pre-push` 会在 push 时拦下任何改动 `content/writings/` 的提交（**别用 `--no-verify` 绕过**，
  除非用户明确要求推文章）。
- `scripts/push_to_github.py` 是**写入方那台机器**的工具，本机永远不运行它。
- 其它内容目录（`works/` `videos/` `courses/` `news/` `about.md`）本地随便写。

⚠️ **飞书同步机只推 `content/writings/`，从不重新生成 `data/*.json` 和 `public/*.xml`。**
所以 `git pull` 到新文章后，`data/writings.json`、`public/sitemap.xml`、`public/rss.xml`、
`public/llms.txt` 在远端是**过期的**。合并完必须本地跑一次 `npm run build`
（= sync:content → generate-seo-files → vite build）把产物补上再提交，
否则线上会漏掉那几篇文章（首页计数、sitemap、RSS 都会少）。
实测踩过：合并后 `data/writings.json` 少了 3 篇新文章，git 合并**不会报错**——
JSON 数组的合并结果不可信，只能靠重新生成来定。

### 2. 依赖版本比你的训练数据新 —— 先读源码再写代码

Vite 7 / TanStack Router & Start 1.16x / Tailwind 4 / React 19 的用法与常见的旧写法**有破坏性差异**。
写任何路由、loader、构建配置之前，先在 `node_modules/` 里核对实际 API（类型定义、导出的钩子、配置文件字段），
不要凭记忆写。TanStack Router 的文件路由由插件生成 `src/routeTree.gen.ts`——**不要手改**它。

### 3. 验收按真实页面来，不信状态码

很多框架的 404 页面也返回 HTTP 200。判定页面是否正常要**数正文字数**并和 404 基线对比，
或直接用浏览器工具打开页面看。另外：单次抓取失败和"页面坏了"长得一模一样，**判定前重试 2–3 次**。
数字类结论要用两种不同方式各数一遍——搜索会给你假阴性（数字写成分段常量、中英文变体、剥掉 `<script>` 再搜）。

---

## 命令

```bash
npm run dev          # 开发（会先跑 sync:content）
npm run build        # 构建：sync:content → generate-seo-files → vite build，产物在 dist/client
npm run test:sync    # 同步脚本与 lib 的单元测试
npm run seo:files    # 只重新生成 sitemap / robots 等 SEO 文件
npm run og           # 生成 OG 图
npm run lint         # eslint
```

**构建会 fail closed**：Markdown 校验不过 `npm run build` 直接失败，不会带着旧数据发布。
这是有意设计——看到构建失败先修内容校验，不要绕过。

---

## 部署（分支即部署目标）

**线上只有一条部署路径：push 到 `main` → Cloudflare Pages 自动构建部署。**
Cloudflare Pages 项目的 Git 集成：构建命令 `npm run build`，输出目录 `dist/client`。
**本地不需要跑任何部署命令**，推上去就行。

| 目标 | 触发 | 说明 |
|---|---|---|
| **Cloudflare Pages**（线上） | push 到 `main`，CF 自动构建 | 唯一路径。改代码 → 提交 → 推 main → CF 构建上线 |
| GitHub Pages（遗留备用） | 只能在 Actions 里手动 Run workflow | `.github/workflows/deploy.yml` 原先也会随 push 自动跑，等于每次推代码发两次；已改成**只能手动触发** |

- 生产分支是 `main`——**别在别的分支上改线上会用的代码**。
- 仓库公开可见（PUBLIC），推代码前确认没有不想公开的内容。
- `dist/client` 里的 `404.html` 是真 404 页，**不要**再做 SPA fallback 拷贝（会造成软 404 稀释权重）。
- ⚠️ 改完 `deploy.yml` 的触发条件后，GitHub Pages 上那一版会**停更**。需要它跟着更新就手动 Run workflow。

---

## 提交纪律

- **永远不要 `git add -A` / `git add .`**，只写明确文件路径。
- 提交信息写**后果**，不只写改了什么：
  - ❌ `fix: 修复内容同步`
  - ✅ `修：同步脚本跳过缺 slug 的文件 —— 原本会让整批文章推不上去`
- 改 `.env` 类配置时，注释写「**填错的后果**」，不写「这是什么」。

---

## 内容规范

- 一个条目一个 Markdown，文件名 = frontmatter 里的 `slug`。
- `slug` 只允许小写英文、数字、连字符。
- `date` 必须是 `YYYY-MM-DD` 有效日期。
- 图片必须在 `public/` 下，且路径不能逃出 `public/`。
- 外链只允许 `http://` / `https://`。
- 字段与可见性（`status: published` / `active` 才对外可见）见 README 的字段表。

## 视觉规范

改动 UI 前先读 `DESIGN.md`（数字旷野 Design System v1.0）：深色暖底 + **唯一强调色电绿**（`--primary`），
克制的排版与动效。不要引入第二套强调色，也不要给同一元素再叠一层动效库。
