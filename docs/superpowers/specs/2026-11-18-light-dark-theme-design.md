# 浅色 / 深色主题切换 —— 设计文档

- **日期**：2026-11-18
- **状态**：已定稿，待实现
- **相关**：`DESIGN.md`（数字旷野 Design System v1.0）、`AGENTS.md`

---

## 1. 目标

给数字旷野加浅色 / 深色两套外观，用户可切换。

**不做**：主题编辑器、主题商店、更多配色方案、字体切换。

---

## 2. 已确认的决策

| 决策点 | 结论 |
|---|---|
| 首次访问（新访客、无存储偏好）默认主题 | **跟随系统**（`prefers-color-scheme`） |
| 浅色模式下的强调色 | **同一支电绿，分两档明度**：`--primary` 作色块，`--primary-text` 作文字 |
| 切换控件形态 | **二态开关按钮**（无第三态） |
| 技术路线 | **`.dark` class + CSS 变量**（shadcn / Tailwind 4 标准） |
| 按钮位置 | 桌面端导航栏右侧（AI助手 与 课程按钮 之间）；移动端在汉堡菜单内 |

---

## 3. 现状（实现前的事实）

- `src/styles.css` 的 `:root` 里装的就是**深色**调色板；`.dark { ... }` 只覆盖 `--background` / `--foreground` 两个值。
- `@custom-variant dark (&:is(.dark *));` 已声明为 class 形式，但**`.dark` 类从未被加到任何元素上** → `dark:` 变体一直是失效状态。
- 站点是 **prerender 静态输出**（`vite.config.ts` 有 `prerender` 配置），首屏是静态 HTML → 主题必须在首帧前确定，否则会闪。
- 颜色几乎全部走 token；唯一写死颜色的是 `src/components/DifyEmbed.tsx`（12 处 `oklch(...)` + `!important`，聊天挂件）。
- `src/components/ui/chart.tsx` 存在但**全站未使用** → `--chart-1..5` 不用管。
- `text-primary` 出现 78 处（不含 `text-primary-foreground`）。其中「作为常驻文字渲染」的必须换 token，「装饰 / 图标 / hover」可以保留。

---

## 4. 颜色架构

### 4.1 切换机制

- `:root` = **浅色**调色板
- `.dark` = **深色**调色板（现有 `:root` 的值**原样搬进去**，深色模式观感零变化）
- 两者 specificity 相同（都是单类/伪类，0-1-0），靠**书写顺序**取胜：`.dark` 必须写在 `:root` 之后（现状已经是这个顺序，保持即可）。
- `<html>` 上有 `.dark` → 深色；没有 → 浅色。

### 4.2 新增 token：`--primary-text`

规则一句话：**`--primary` 是色块，`--primary-text` 是文字。**

| 用途 | token | 深色值 | 浅色值 |
|---|---|---|---|
| 色块：按钮底色、边框、装饰、发光点 | `--primary` | `oklch(0.86 0.22 145)`（不变） | `oklch(0.86 0.22 145)`（不变） |
| 文字：链接、正文强调、小字 | `--primary-text` | `oklch(0.86 0.22 145)`（不变） | `oklch(0.52 0.12 145)` |

同时在 `@theme inline` 里映射 `--color-primary-text: var(--primary-text);`，让 Tailwind 产出 `text-primary-text` 工具类。

### 4.3 浅色调色板（全部实测对比度）

底色取**暖纸白**，保留 DESIGN.md 的暖色调基因。

| token | 浅色值 | hex | 说明 |
|---|---|---|---|
| `--background` | `oklch(0.98 0.004 80)` | `#faf8f5` | 暖纸白 |
| `--foreground` | `oklch(0.22 0.012 70)` | | 正文 |
| `--surface` | `oklch(0.955 0.005 80)` | | 卡片（比背景略深） |
| `--surface-elevated` | `oklch(1 0 0)` | | 浮层（纯白） |
| `--ink` | `oklch(0.22 0.012 70)` | | 同正文 |
| `--ink-soft` | `oklch(0.45 0.012 75)` | | 次要文字 |
| `--hairline` | `oklch(0.88 0.006 75)` | | 分隔线 |
| `--card` / `--card-foreground` | `oklch(0.985 0.004 80)` / `oklch(0.22 0.012 70)` | | |
| `--popover` / `--popover-foreground` | `oklch(1 0 0)` / `oklch(0.22 0.012 70)` | | |
| `--primary` | `oklch(0.86 0.22 145)` | `#5ef56d` | 色块，不变 |
| `--primary-foreground` | `oklch(0.18 0.01 145)` | | 色块上的文字，不变 |
| `--primary-text` | `oklch(0.52 0.12 145)` | `#357a3a` | 文字专用 |
| `--secondary` / `--secondary-foreground` | `oklch(0.93 0.006 80)` / `oklch(0.28 0.012 70)` | | |
| `--muted` / `--muted-foreground` | `oklch(0.945 0.005 80)` / `oklch(0.50 0.012 75)` | | |
| `--accent` / `--accent-foreground` | `oklch(0.86 0.22 145)` / `oklch(0.18 0.01 145)` | | 不变 |
| `--destructive` / `--destructive-foreground` | `oklch(0.55 0.2 25)` / `oklch(0.98 0 0)` | | |
| `--border` / `--input` | `oklch(0.88 0.006 75)` | | |
| `--ring` | `oklch(0.52 0.12 145)` | | 焦点环用深绿（浅底上亮绿环看不见） |

**对比度实测**（`scripts/check-contrast.mjs.py`，oklch → sRGB → WCAG）：

| 组合 | 对比度 | 判定 |
|---|---|---|
| 深色：正文 `--foreground` on `--background` | 16.77:1 | ✅ |
| 深色：`--primary` 当文字 on `--background` | 13.63:1 | ✅（深色下本来就达标） |
| 浅色：正文 on `--background` | 16.36:1 | ✅ |
| 浅色：`--primary` 色块 + `--primary-foreground` 文字 | 13.17:1 | ✅ |
| 浅色：`--primary-text` on `--background` | **4.94:1** | ✅ 正文 AA 达标（≥4.5） |

### 4.4 效果层随主题翻转

| token | 深色 | 浅色 | 原因 |
|---|---|---|---|
| `--glow-primary` | `0 0 0 1px oklch(0.86 0.22 145 / 0.3), 0 8px 40px -8px oklch(0.86 0.22 145 / 0.4)` | `0 0 0 1px oklch(0.52 0.12 145 / 0.25)` | 白底上的绿晕像脏渍，浅色只留一圈深绿描边 |
| `--shadow-card` | `0 1px 0 0 oklch(1 0 0 / 0.04) inset, 0 30px 60px -30px oklch(0 0 0 / 0.5)` | `0 1px 2px 0 oklch(0.3 0.01 70 / 0.06), 0 12px 32px -20px oklch(0.3 0.01 70 / 0.16)` | 白底上内高光是脏边；换成更浅更暖的柔影 |
| `--grain-opacity` | `0.5` | `0.25` | 亮底上 0.5 的噪点会整体发灰 |
| `--grain-blend` | `overlay` | `soft-light` | 亮底上 overlay 会压暗 |

`--grain`（噪点 SVG 本身）两套主题共用同一个 data URI，只是不透明度与混合模式随主题变。
`body::before` 的 `opacity` / `mix-blend-mode` 改为读这两个 token，主题切换时自动跟随。

---

## 5. 主题状态管理

### 5.1 存储与解析

- 存储键：`localStorage["digiwild-theme"]`，值 `"light"` | `"dark"`。
- **解析顺序**：有存储值 → 用存储值；没有 → 读 `matchMedia("(prefers-color-scheme: dark)").matches` → 深色或浅色。
- 用户点一次切换按钮 → 写入 localStorage，**此后系统偏好不再影响**（二态开关的固有代价）。
- 恢复「跟随系统」：清掉 localStorage 即可（`localStorage.removeItem("digiwild-theme")`）。

### 5.2 防闪烁（首帧前定主题）

站点是 prerender 静态站，必须在样式生效前把类名挂上。

在 `src/routes/__root.tsx` 的 `<head>` **最前面**放一段内联脚本（约 300 字节），逻辑与 5.1 的解析顺序一致：

```js
(function(){try{
  var s=localStorage.getItem("digiwild-theme");
  var t=s||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");
  document.documentElement.classList.toggle("dark",t==="dark");
}catch(e){document.documentElement.classList.add("dark");}})();
```

`catch` 分支默认给深色（与当前线上观感一致，绝不因为脚本出错就变成白底）。

### 5.3 代码位置

| 文件 | 职责 |
|---|---|
| `src/lib/theme.ts` | 纯函数：存储键、解析、生效、订阅系统偏好变化。不依赖 React |
| `src/hooks/use-theme.ts` | React hook：返回当前主题 + 切换函数 |
| `src/components/ThemeToggle.tsx` | 图标按钮（lucide-react 的 `Sun` / `Moon`），`aria-label` + `title` |

命名遵循现有约定：组件 PascalCase（`Nav.tsx`），hooks 与 lib 用 kebab-case（`use-mobile.tsx` / `dify.ts`）。

### 5.4 切换按钮

- 桌面端：导航栏右侧，`AI助手` 按钮与 `课程 →` 按钮之间。
- 移动端：汉堡菜单内，与其它导航项同列。
- 形态：单个圆角图标按钮，风格对齐现有 `AI助手` 按钮（`rounded-full` + `hover:bg-surface`）。
- 图标：当前是浅色 → 显示 `Moon`（点击变深）；当前是深色 → 显示 `Sun`（点击变浅）。
- 无障碍：`aria-label="切换到深色模式"` / `"切换到浅色模式"`，随当前状态变；`title` 同样文案。

---

## 6. 需要改的代码

### 6.1 `src/styles.css`

1. `:root` 整体换成浅色调色板（4.3 表）。
2. 现有深色值原样搬进 `.dark`，并把 `.dark` 补全为完整调色板（现在只有 2 个值）。
3. `@theme inline` 增加 `--color-primary-text: var(--primary-text);`。
4. 效果层 token 按 4.4 分主题给值。
5. `.prose-custom` 里三处强调色改用 `--primary-text`：
   - `em`（正文强调）
   - `a`（正文链接）
   - `li::marker`（列表符号，可改可不改；改为 `--primary-text` 更清晰）
   - `blockquote` 的左边框属于装饰，保留 `--primary`。

### 6.2 文字角色的 `text-primary` → `text-primary-text`

全站 `text-primary` 78 处，按「是否作为常驻文字渲染」筛选：

**必须改**（常驻文字，浅色下亮绿不可读）：

| 文件 | 位置 |
|---|---|
| `src/components/Hero.tsx` | `<em className="italic text-primary">AI</em>`、badge 里的 `text-primary` |
| `src/components/Work.tsx` | `<em className="italic text-primary">东西</em>` |
| `src/components/Courses.tsx` | `<em className="italic text-primary">分享给你</em>` |
| `src/components/Videos.tsx` | `<em className="italic text-primary">说</em>` |
| `src/components/Marquee.tsx` | 交替色 `text-primary`（大面积常驻文字） |
| `src/components/IntentPaths.tsx` | `<span className="text-primary">00</span>` 序号 |
| `src/components/Footer.tsx` | `activeProps={{ className: "text-primary" }}` 当前页链接 |
| `src/components/ui/button.tsx` | `link` 变体的 `text-primary` |
| `src/styles.css` | `.prose-custom` 的 `em` / `a` / `li::marker` |

**保留**（装饰 / 图标 / hover 瞬时态）：`hover:text-primary`、`text-primary` 的图标（`AIChat.tsx` 的图标）、`border-primary`、发光点、加载动画等。

> 判定标准：**鼠标离开后仍留在屏幕上的文字** → 用 `--primary-text`。其余保留 `--primary`。

### 6.3 `src/components/DifyEmbed.tsx`

12 处写死的 `oklch(...)` 改成 `var(--primary)` / `var(--background)` / `var(--foreground)` / `var(--surface)` / `var(--muted-foreground)` / `var(--hairline)` 等 token 引用，这样聊天挂件才会跟着主题变。

### 6.4 `src/routes/__root.tsx`

- `<head>` 最前面插入 5.2 的内联脚本。
- 加 `<meta name="theme-color">`，由 JS 随主题更新（移动端地址栏配色）。

---

## 7. 验收标准

| # | 检查项 | 通过条件 |
|---|---|---|
| 1 | 首次访问（无存储、系统为浅色） | 页面是浅色，无闪白 |
| 2 | 首次访问（系统为深色） | 页面是深色，与当前线上观感一致 |
| 3 | 点切换按钮 | 立即换色，图标翻转，刷新后保持 |
| 4 | 切换后刷新 | **不闪烁**（无先白后黑 / 先黑后白） |
| 5 | 浅色下正文 / 链接 / 强调 | 对比度 ≥ 4.5:1（4.3 表已给出实测值） |
| 6 | 深色模式观感 | 与改动前**逐像素一致**（调色板值未变） |
| 7 | 导航、移动端菜单 | 两个位置的切换按钮都能用 |
| 8 | 聊天挂件（配了 Dify 时） | 浅色下不再是一块深色 |
| 9 | `npm run test:sync` | 20/20 通过 |
| 10 | `npm run build` | 构建通过，`dist/client` 产出正常 |
| 11 | 真实页面抽查 | 浏览器打开浅/深两版各 3 个页面（首页 / 一篇文章 / 一个作品），无错色、无溢出 |

验证工具：`scripts/check-contrast.mjs.py`（对比度复算）+ chrome-devtools（真实渲染截图）。

---

## 8. 风险与取舍

| 风险 | 处理 |
|---|---|
| 浅色下仍有漏改的文字用亮绿 → 读不清 | 第 7 条逐页抽查；`text-primary-text` 只在文字角色使用，不追求"全站统一" |
| 深色模式观变化 | 调色板值**一个不动**，只搬位置；第 6 条实测验证 |
| 切换瞬间闪烁 | 内联脚本在 `<head>` 最前，第 4 条验证 |
| 偏好与系统不一致（用户选了浅色，系统是深色） | 以用户选择为准，这是标准行为 |
| 二态开关没有「恢复跟随系统」的入口 | 文档写明：清 localStorage 即可 |
| `prefers-color-scheme` 在用户切换后仍变化 | 切换后写入 localStorage，**不**订阅系统变化（避免系统变、页面跟着变） |

---

## 9. 不做的事

- 不做「跟随系统」第三态（用户已选二态开关）
- 不做主题色切换器 / 主题编辑器
- 不做字体、圆角、间距的独立开关
- 不动 `--chart-1..5`（图表组件全站未使用）
- 不改部署配置、不改内容流水线
