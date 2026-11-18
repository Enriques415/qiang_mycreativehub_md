import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

type Props = {
  className?: string;
};

/**
 * 深浅色切换按钮。
 *
 * 图标由 CSS 驱动（.dark 在 <html> 上），不依赖 React 状态 ——
 * 这样 prerender 出来的静态 HTML 首帧就是对的，不会出现图标闪一下
 * 或 hydration 不一致。
 */
export function ThemeToggle({ className = "" }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      suppressHydrationWarning
      aria-label={isDark ? "切换到浅色模式" : "切换到深色模式"}
      title={isDark ? "切换到浅色模式" : "切换到深色模式"}
      className={`flex items-center justify-center rounded-full p-2 text-muted-foreground transition-colors hover:bg-surface hover:text-foreground ${className}`}
    >
      <Moon className="h-4 w-4 dark:hidden" aria-hidden="true" />
      <Sun className="hidden h-4 w-4 dark:block" aria-hidden="true" />
    </button>
  );
}
