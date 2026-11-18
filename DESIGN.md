# 数字旷野 Design System

**版本**：1.1 · **更新日期**：2026-11-18

这是数字旷野全平台的视觉设计语言规范。未来所有产品（独立工具、课程销售页、AI 资讯站等）均应遵循本规范，以确保品牌一致性。

---

## 1. 品牌定位

**关键词**：Editorial × Terminal × Indie Creator

一种编辑感与终端感的混合美学——不是冷冰冰的技术展示，也不是花哨的 SaaS 界面，而是一个**真实创作者的数字空间**：有温度、有排版、有立场。

- 不追求最多的功能，而是最干净的表达
- 不追求最炫的动效，而是最恰当的反馈
- 暖底（深/浅双主题）+ 单一电绿点缀 = 克制而精准

---

## 2. 色彩系统

### 2.1 调色板

站点有**两套主题**，但只有**一支强调色**——同一支电绿分两档明度：
深色主题用亮绿，浅色主题用深绿。除这两档之外不引入第二个色相。

主题实现方式：`:root` 写浅色（暖纸白），`.dark` 写深色（暖黑）。两者
specificity 相同，靠**书写顺序**取胜——`.dark` 块必须写在 `:root` 之后。

#### 深色主题 `.dark`（品牌原色）

| 用途 | CSS 变量 | oklch 值 | hex | 说明 |
|---|---|---|---|---|
| 背景 | `--background` | `oklch(0.16 0.005 60)` | `#0f0d0b` | 暖深黑，接近纯黑但带一点暖色底色 |
| 主文字 | `--foreground` | `oklch(0.95 0.02 80)` | `#f6ede0` | 暖米白，不是纯白，更柔和 |
| 表面层 | `--surface` | `oklch(0.19 0.006 60)` | `#161311` | 卡片/区块背景，比背景略亮 |
| 高阶表面 | `--surface-elevated` | `oklch(0.22 0.008 60)` | `#1d1a17` | 浮层/下拉背景 |
| 分隔线 | `--hairline` | `oklch(0.32 0.008 70)` | `#36322e` | 所有边框、分割线 |
| **点缀色** | `--primary` | `oklch(0.86 0.22 145)` | `#5ef56d` | **唯一强调色**，电绿——只当色块 |
| 点缀前景 | `--primary-foreground` | `oklch(0.18 0.01 145)` | `#0f130f` | 点缀色上的文字 |
| **点缀文字** | `--primary-text` | `oklch(0.86 0.22 145)` | `#5ef56d` | 强调色**当文字**时用（深色下与 primary 同值） |
| 次要文字 | `--muted-foreground` | `oklch(0.68 0.015 80)` | `#9d978e` | 描述文字、次要信息 |
| 图表色 1 | `--chart-1` | `oklch(0.86 0.22 145)` | `#5ef56d` | 同 primary |
| 图表色 2 | `--chart-2` | `oklch(0.75 0.12 60)` | — | 暖灰蓝 |
| 图表色 3 | `--chart-3` | `oklch(0.6 0.15 30)` | — | 暖橙 |
| 图表色 4 | `--chart-4` | `oklch(0.65 0.18 250)` | — | 紫罗兰 |
| 危险色 | `--destructive` | `oklch(0.65 0.22 25)` | `#f94144` | 删除/错误 |

#### 浅色主题 `:root`

| 用途 | CSS 变量 | oklch 值 | hex | 说明 |
|---|---|---|---|---|
| 背景 | `--background` | `oklch(0.98 0.004 80)` | `#faf8f5` | 暖纸白，保留 DESIGN.md 的暖色调基因 |
| 主文字 | `--foreground` | `oklch(0.22 0.012 70)` | `#1e1a15` | 暖近黑，不是纯黑 |
| 表面层 | `--surface` | `oklch(0.955 0.005 80)` | `#f2f0ec` | 区块背景，比背景略深（浅色下层次反过来） |
| 高阶表面 | `--surface-elevated` | `oklch(1 0 0)` | `#ffffff` | 浮层/下拉背景 |
| 分隔线 | `--hairline` | `oklch(0.88 0.006 75)` | `#dad7d3` | 所有边框、分割线 |
| **点缀色** | `--primary` | `oklch(0.86 0.22 145)` | `#5ef56d` | 电绿不变——只当色块 |
| 点缀前景 | `--primary-foreground` | `oklch(0.18 0.01 145)` | `#0f130f` | 点缀色上的文字 |
| **点缀文字** | `--primary-text` | `oklch(0.52 0.12 145)` | `#357a3a` | 强调色**当文字**时用——浅色下亮绿只有 1.34:1，必须换这档 |
| 次要文字 | `--muted-foreground` | `oklch(0.5 0.012 75)` | `#67625c` | 描述文字、次要信息 |
| 图表色 1 | `--chart-1` | `oklch(0.52 0.12 145)` | `#357a3a` | 浅色下图表用深绿档 |
| 图表色 2 | `--chart-2` | `oklch(0.75 0.12 60)` | — | 暖灰蓝 |
| 图表色 3 | `--chart-3` | `oklch(0.6 0.15 30)` | — | 暖橙 |
| 图表色 4 | `--chart-4` | `oklch(0.65 0.18 250)` | — | 紫罗兰 |
| 危险色 | `--destructive` | `oklch(0.55 0.2 25)` | `#cc272e` | 删除/错误 |
| 焦点环 | `--ring` | `oklch(0.52 0.12 145)` | `#357a3a` | 浅色下焦点环必须用深绿档才看得见 |

#### 对比度基线（WCAG，用 `scripts/check-contrast.mjs.py` 实算）

| 组合 | 深色 | 浅色 | 要求 |
|---|---|---|---|
| 正文 foreground / background | 16.77:1 | 16.36:1 | ≥ 4.5:1 |
| 次要文字 muted-foreground / background | 7.24:1 | 5.67:1 | ≥ 4.5:1 |
| 强调文字 primary-text / background | 13.63:1 | 4.94:1 | ≥ 4.5:1 |
| 色块上的字 primary-foreground / primary | 13.17:1 | 13.17:1 | ≥ 4.5:1 |

**不要凭眼睛判断**，改完配色跑一次 `python3 scripts/check-contrast.mjs.py`。

### 2.2 强调色的两个角色（最重要的一条）

电绿有两个变量，别混用：

| 变量 | 角色 | 用在哪 | 判定方法 |
|---|---|---|---|
| `--primary` / `bg-primary` | **绿块** | 按钮底色、大面积填充、`::selection` 底 | 绿色是**块的底色**，上面会盖 `--primary-foreground` 的深字 |
| `--primary-text` / `text-primary-text` | **看得见的绿** | 文字、边框线、圆点、图标、序号、链接 | 绿色要**直接对着背景被看见** |
| `--primary-foreground` | 绿块上的字 | `bg-primary` 底上的文字 | 绿底 + 深字（13.17:1） |

判定一句话：**这个绿色是「块的底色」，还是「要被人直接看见的东西」？**
是块的底色就用 `--primary`，要被人直接看见就用 `--primary-text`。

```
❌ <span className="text-primary">Course</span>        // 浅色下亮绿字 = 隐形（1.34:1）
✅ <span className="text-primary-text">Course</span>    // 深绿字 = 4.94:1

❌ <button className="bg-primary text-primary">报名</button>
✅ <button className="bg-primary text-primary-foreground">报名</button>
```

**为什么浅色下要分两档**：亮绿 `#5ef56d` 在纸白底 `#faf8f5` 上只有 **1.34:1**——
作为块底色没问题（上面压着 13.17:1 的深字），但作为文字、细线、8px 圆点
就是隐形。所以浅色主题把「直接被看见的绿」换成深绿档 `#357a3a`（4.94:1）。

**深色主题不受影响**：`.dark` 里 `--primary-text` 与 `--primary` 同值，
所以按上面规则改代码，深色观感一个像素都不变。

**hover 态同样是"要被人看见的东西"**。浅色下 `hover:text-primary` 会让字变成
亮绿、在纸白底上等于隐形，所以悬停要染绿时一律用 `hover:text-primary-text`。

全树检查工具：

```bash
python3 scripts/apply-primary-text.py --check   # 有裸 text-primary 就退出码 1
```

### 2.3 用色原则

```
原则一：primary（电绿）只用于「最想让用户做的动作」
        → CTA 按钮底色、hover 边框、标签底色
        → 凡是当「字的颜色」用，改用 primary-text

原则二：foreground（暖白/暖黑）用于所有标题、正文
        → 不要在正文里使用 muted-foreground 作为主要文字颜色

原则三：background → surface → surface-elevated 形成三个层次的亮度递进
        → 深色下 surface 更亮；浅色下 surface 更深

原则四：hairline（分隔线）无处不在
        → 列表分隔、卡片边框、标题下划线
```

### 2.4 CSS 变量引用方式

```css
/* ✅ 正确：在任何组件里使用 CSS 变量 */
background-color: var(--background);
color: var(--primary-text);
border-color: var(--hairline);

/* ✅ 推荐写法：直接使用 Tailwind 语义化颜色 */
bg-background text-primary-text border-hairline
```

### 2.5 主题切换

| 项 | 值 | 说明 |
|---|---|---|
| 存储键 | `digiwild-theme` | localStorage，值 `light` / `dark` |
| 默认 | **跟随系统** | 无存储值时读 `prefers-color-scheme` |
| 优先级 | localStorage > 系统偏好 > 深色兜底 | 异常时兜底深色（与原线上观感一致） |
| 应用方式 | `<html>` 上加/去 `.dark` class | Tailwind `dark:` 变体靠它生效 |
| 防闪烁 | `<head>` 内联同步脚本 | 必须在 `<body>` 之前执行，否则首帧闪白 |
| 切换控件 | 二态开关 | 桌面导航栏右侧（课程按钮旁）+ 移动端汉堡菜单内 |

```
二态开关的固有代价：用户点过一次后，系统偏好不再生效。
恢复「跟随系统」需要清掉 localStorage 的 digiwild-theme。
```

---

## 3. 字体系统

### 3.1 三层字体

| 层级 | 字体 | CSS 变量 | 用途 |
|---|---|---|---|
| **Display** | Fraunces（衬线） | `--font-display` | 所有标题 h1-h4、卡片标题、价格数字 |
| **Body** | Inter（无衬线） | `--font-sans` | 正文、描述、UI 文字 |
| **Mono** | JetBrains Mono | `--font-mono` | 标签、日期、代码、时间戳 |

### 3.2 字号层级

```
h1 / 页面大标题：text-5xl md:text-6xl，font-light，tracking-tight
h2 / 区块标题：text-3xl md:text-4xl，font-normal
h3 / 卡片标题：text-2xl md:text-3xl，font-normal
正文描述：text-base → text-lg，leading-relaxed
标签/元数据：font-mono text-xs
强调标签：font-mono text-[10px] uppercase tracking-[0.2em]
```

### 3.3 Fraunces 字体的关键特性

```css
/* 标题字体启用 ss01 / ss02 连字特性 */
font-feature-settings: "ss01", "ss02";

/* 使用 font-display 工具类时自动生效 */
```

### 3.4 字体引用方式

```tsx
// ✅ 正确
<h1 className="font-display text-5xl">标题</h1>
<p className="font-sans text-base leading-relaxed">正文</p>
<span className="font-mono text-xs">标签</span>

// ❌ 避免：直接写 font-family
```

---

## 4. 布局系统

### 4.1 容器宽度

| 用途 | Tailwind 类 | 说明 |
|---|---|---|
| 全站主容器 | `max-w-6xl` | 首页 Hero、列表页、内容模块 |
| 文章/项目正文 | `max-w-3xl` | writing、work、news 详情页 |
| 课程详情正文 | `max-w-5xl` | courses 详情页（因有侧边栏略宽） |
| 侧边栏 | `max-w-xl` | 右侧悬浮卡片 |

### 4.2 页面留白

```tsx
// 页面主内容区
<div className="mx-auto max-w-3xl px-6 py-16 md:py-24">

// 全宽内容区
<div className="mx-auto max-w-6xl px-6">
```

### 4.3 栅格布局

```tsx
// ✅ 典型详情页布局：主内容 + 侧边栏
<div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
  <div className="lg:col-span-7">正文</div>
  <aside className="lg:col-span-5">侧边栏</aside>
</div>

// ✅ 典型列表页布局
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
```

### 4.4 间距韵律

```
页面顶部内边距（pt-20）：留出导航栏高度
页面区块间距：py-24 md:py-32
卡片内边距：p-6 md:p-8 → p-10（呼应圆角加大）
正文容器的垂直留白：mt-12
```

---

## 5. 圆角系统

### 5.1 圆角层级

| 用途 | Tailwind 类 | 说明 |
|---|---|---|
| 按钮 | `rounded-full` | 全圆角胶囊按钮 |
| 小元素 | `rounded-md` | 标签、徽章 |
| 卡片 | `rounded-2xl` | 中等卡片 |
| **大卡片/容器** | `rounded-[2rem]` | **主力圆角，所有内容容器用这个** |
| 更大容器 | `rounded-[1.75rem]` | 图片、封面卡 |

```tsx
// ✅ 标准内容容器
<div className="rounded-[2rem] border border-hairline bg-surface/40 p-8">

// ✅ CTA 按钮
<button className="rounded-full bg-primary px-5 py-3">

// ✅ 标签
<span className="rounded-full border border-hairline px-3 py-1">
```

---

## 6. 边框与阴影

### 6.1 边框

```tsx
// 标准边框（贯穿全站）
border border-hairline

// hover 边框（交互反馈）
hover:border-primary/40

// 主动画边框
border border-primary/40
```

### 6.2 阴影

```css
/* 卡片阴影（已封装为工具类） */
className="shadow-card"

/* Glow 效果（CTA 按钮专用） */
className="glow-primary"
```

---

## 7. 组件规范

### 7.1 详情页通用模板

```
┌──────────────────────────────────────┐
│  ← BackLink                           │
│                                       │
│  ┌──────────────────────────────┐    │
│  │  header (rounded-[2rem])      │    │
│  │  meta tags | title | excerpt  │    │
│  │  CTA buttons                  │    │
│  └──────────────────────────────┘    │
│                                       │
│  ┌──────────────────────────┐ ┌─────┐ │
│  │  正文容器 (rounded-[2rem]) │ │侧边│ │
│  │  Prose / Markdown        │ │边栏 │ │
│  └──────────────────────────┘ └─────┘ │
│                                       │
│  ┌──────────────────────────────┐     │
│  │  Continue Exploring          │     │
│  └──────────────────────────────┘     │
│                                       │
│  ┌──────┐  ←  prev  ┌──────┐        │
│  └──────┘          │ next →│  ┌────┐ │
│                    └────────┘  └────┘ │
└──────────────────────────────────────┘
```

### 7.2 列表项规范

```tsx
// ✅ 标准列表项（Writing/Videos/Work 列表）
<ul className="divide-y divide-hairline border-y border-hairline">
  <li>
    <Link className="group grid ... hover:bg-surface">
      <div>日期</div>
      <div>
        <h3 className="group-hover:text-primary-text">标题</h3>
        <p>摘要</p>
      </div>
      <div>标签</div>
      <div>→</div>
    </Link>
  </li>
</ul>

// hover 效果：背景变 surface，标题颜色变深绿档
group-hover:bg-surface group-hover:text-primary-text
```

### 7.3 CTA 按钮

```tsx
// ✅ 主按钮（全圆角，primary 色）
<button className="rounded-full bg-primary px-5 py-3
           text-sm font-medium text-primary-foreground
           transition-transform hover:-translate-y-0.5">
  立即报名 →
</button>

// ✅ 次要按钮（全圆角，边框）
<button className="rounded-full border border-hairline px-5 py-3
           text-sm text-foreground
           hover:bg-surface">
  了解更多
</button>

// ✅ Ghost 按钮（仅文字）
<button className="text-muted-foreground hover:text-primary-text">
  了解更多 →
</button>
```

### 7.4 悬浮卡片

```tsx
// ✅ 标准悬浮卡片（sticky 侧边栏）
<aside className="lg:col-span-5">
  <div className="sticky top-28">
    <div className="rounded-[2rem] border border-hairline bg-surface/40 p-8">
      ...
    </div>
  </div>
</aside>
```

---

## 8. 动效规范

### 8.1 过渡时长

```
transition 基础时长：200ms（所有颜色/背景过渡）
按钮 hover 位移：transition-transform hover:-translate-y-0.5
卡片/封面图缩放：transition-transform duration-700 group-hover:scale-[1.02]
页面切换：无页面级过渡动画（快速响应优先）
```

### 8.2 滚动效果

```tsx
// ✅ 导航栏滚动变色（Nav 组件）
header className={`${scrolled ? "bg-background/70 backdrop-blur-xl border-hairline" : "border-transparent"}`)

// ✅ 平滑滚动
html scroll-behavior: smooth;
```

### 8.3 Marquee 动画

```tsx
// 用于首页轮播带
<div className="animate-marquee">内容...</div>

// cursor blink（光标闪烁）
<span className="cursor-blink" />
```

### 8.4 渐入动画（Hero 区域）

```tsx
// 首页标题逐层渐入（Framer Motion）
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.05 }}
>
```

---

## 9. Markdown 文章排版

### 9.1 prose-custom 规范

```css
/* 正文颜色：使用 muted-foreground */
.prose-custom { color: var(--muted-foreground); }

/* 首段：醒目字号，提升阅读节奏 */
.prose-custom > p:first-of-type {
  color: var(--foreground);
  font-size: 1.25rem;
  line-height: 1.9;
}

/* 标题：衬线字体，细边框分割 */
.prose-custom h2 {
  border-top: 1px solid var(--hairline);
  padding-top: 1em;
  margin-top: 2.25em;
}

/* 引用：左侧主色边框 + 斜体 + 加大字号 */
.prose-custom blockquote {
  border-left: 2px solid var(--primary);
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.25rem;
  background: color-mix(in oklab, var(--surface) 80%, transparent);
}

/* 强调：斜体用强调色**文字档**（--primary-text） */
.prose-custom em { color: var(--primary-text); }

/* 链接：强调色文字档 + 下划线（下划线保证不靠颜色也能分辨） */
.prose-custom a { color: var(--primary-text); }

/* 代码：surface 背景 + hairline 边框 */
.prose-custom code {
  background: var(--surface);
  border: 1px solid var(--hairline);
}
```

---

## 10. 栅格覆盖（Overlay / Grain）

```css
/* 全站 Grain 纹理叠加在 body 层。
   纹理本身是同一个 SVG 数据 URI，只有不透明度与混合模式随主题翻转：
   浅色下噪点必须更淡、不能用 overlay（否则纸白底会被压脏）。 */
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: var(--grain);   /* SVG noise 数据 URI */
  opacity: var(--grain-opacity);     /* 深色 .5 / 浅色 .25 */
  mix-blend-mode: var(--grain-blend); /* 深色 overlay / 浅色 soft-light */
  z-index: 1;
}
```

---

## 11. 响应式断点

```
默认（mobile）：单列，px-6
md（768px+）：开始双列，部分布局展开
lg（1024px+）：详情页侧边栏布局激活
xl（1280px+）：侧边栏 sticky top-28 生效
```

---

## 12. 新项目接入指南

### 12.1 快速开始

新项目需要复用本设计系统时，按以下步骤操作：

**Step 1：复制样式文件**

```bash
# 复制 styles.css 到新项目 src/ 目录
cp styles.css /your-new-project/src/styles.css

# 复制 components.json（如果使用 shadcn/ui）
cp components.json /your-new-project/
```

**Step 2：安装依赖**

```bash
npm install tailwindcss @tailwindcss/vite
npm install -D prettier eslint
```

**Step 3：Vite 配置**

```ts
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

**Step 4：引入样式**

```tsx
// main.tsx
import "./styles.css";
```

### 12.2 颜色变量速查

新项目直接复制以下变量块即可获得完整色彩系统。**两套都要**——`:root` 写浅色，
`.dark` 写深色，`.dark` 必须在 `:root` 之后（两者 specificity 相同，靠书写顺序取胜）：

```css
:root {
  /* 浅色：暖纸白 */
  --background: oklch(0.98 0.004 80);
  --foreground: oklch(0.22 0.012 70);
  --surface: oklch(0.955 0.005 80);
  --surface-elevated: oklch(1 0 0);
  --hairline: oklch(0.88 0.006 75);
  --primary: oklch(0.86 0.22 145);
  --primary-foreground: oklch(0.18 0.01 145);
  --primary-text: oklch(0.52 0.12 145);
  --muted-foreground: oklch(0.5 0.012 75);
  --ring: oklch(0.52 0.12 145);
  --grain-opacity: 0.25;
  --grain-blend: soft-light;
}

.dark {
  /* 深色：品牌原色 */
  --background: oklch(0.16 0.005 60);
  --foreground: oklch(0.95 0.02 80);
  --surface: oklch(0.19 0.006 60);
  --surface-elevated: oklch(0.22 0.008 60);
  --hairline: oklch(0.32 0.008 70);
  --primary: oklch(0.86 0.22 145);
  --primary-foreground: oklch(0.18 0.01 145);
  --primary-text: oklch(0.86 0.22 145);
  --muted-foreground: oklch(0.68 0.015 80);
  --ring: oklch(0.86 0.22 145);
  --grain-opacity: 0.5;
  --grain-blend: overlay;
}
```

配套要在 Tailwind 里注册语义化颜色（否则 `text-primary-text` 这类工具类不存在）：

```css
@theme inline {
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-text: var(--primary-text);
  --color-muted-foreground: var(--muted-foreground);
}

@custom-variant dark (&:is(.dark *));
```

### 12.3 字体引入

在 `index.html` 的 `<head>` 中添加：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 13. 常见错误与规避

```
❌ 不要在 body 上直接写 background-color: #000
✅ 使用 background-color: var(--background)

❌ 不要混用多个强调色（primary 之外的颜色不要用于 CTA）
✅ 点缀色只用 primary（电绿 oklch(0.86 0.22 145)）

❌ 不要用 text-primary 让文字变绿
✅ 文字用 text-primary-text；text-primary 只当色块（bg-/border-）
✅ 提交前跑 python3 scripts/apply-primary-text.py --check

❌ 不要用 hover:text-primary（浅色下悬停即隐形，1.34:1）
✅ 悬停染绿用 hover:text-primary-text

❌ 不要在颜色里写死 oklch / hex
✅ 全部走 CSS 变量，换主题时只改 :root 与 .dark 两处

❌ 不要在正文里大量使用 muted-foreground
✅ 正文内容用 foreground，辅助描述用 muted-foreground

❌ 不要用 rounded-lg 或 rounded-xl（太中规中矩）
✅ 统一用 rounded-[2rem]（大圆角为品牌特征）

❌ 不要给正文内容加页面级过渡动画
✅ 只在 Hero 区域使用 Framer Motion，内容区保持快速响应

❌ 不要在 Markdown 里直接写 style=""
✅ 所有样式通过 prose-custom 或 Tailwind 类实现
```

---

## 14. 更新记录

| 版本 | 日期 | 变更 |
|---|---|---|
| 1.1 | 2026-11-18 | 新增浅色主题：`:root` 改暖纸白、`.dark` 保留原深色；拆出 `--primary-text`（浅色下亮绿当文字只有 1.34:1）；新增 §2.2 强调色双角色规则、§2.5 主题切换；grain 改 token 驱动 |
| 1.0 | 2026-04-27 | 初始版本，从 my-creative-hub 项目提取 |
