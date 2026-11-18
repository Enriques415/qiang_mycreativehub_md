/**
 * 主题状态：解析、存储、生效。
 *
 * 规则：
 * - 存了显式选择 → 用它（此后系统偏好不再影响）；
 * - 没存 → 跟随系统（prefers-color-scheme）；
 * - 站点默认观感是深色，所以拿不到系统偏好时兜底深色。
 *
 * 与 <head> 里那段内联脚本（themeInitScript）逻辑必须保持一致 ——
 * 那段脚本在首帧前跑，这里是交互之后的权威实现。
 */

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "digiwild-theme";

/** 浅色底色的实际色值，用于移动端浏览器地址栏配色。 */
const THEME_COLOR: Record<Theme, string> = {
  light: "#faf8f5",
  dark: "#0c0b0a",
};

export function prefersDark(): boolean {
  try {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch {
    return true;
  }
}

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    // 隐私模式等场景下 localStorage 会抛错，交给系统偏好
    return null;
  }
}

/** 当前应该生效的主题。 */
export function resolveTheme(): Theme {
  return readStoredTheme() ?? (prefersDark() ? "dark" : "light");
}

/** 把主题写到 <html> 上：.dark = 深色。 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  // 让原生滚动条、表单控件也跟着换配色
  root.style.colorScheme = theme;
  syncThemeColor(theme);
}

export function storeTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // 存不了就算了，本次会话仍然生效
  }
}

function syncThemeColor(theme: Theme): void {
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", THEME_COLOR[theme]);
}

/**
 * 首帧前执行的内联脚本。
 *
 * 站点是 prerender 的静态输出，HTML 里没有 <html class>，
 * 主题必须在样式生效前定下来，否则会先闪一下白底。
 * 这段脚本要放在 <head> 最前面，且与上面的解析规则保持一致。
 */
export const themeInitScript = `(function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}");var t=s==="light"||s==="dark"?s:(window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.classList.toggle("dark",t==="dark");document.documentElement.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="dark"?"${THEME_COLOR.dark}":"${THEME_COLOR.light}");}catch(e){document.documentElement.classList.add("dark");}})();`;
