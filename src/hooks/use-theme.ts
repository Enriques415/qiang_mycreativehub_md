import { useCallback, useEffect, useState } from "react";
import { applyTheme, resolveTheme, storeTheme, type Theme } from "@/lib/theme";

/**
 * 主题 hook：返回当前生效的主题与切换函数。
 *
 * 首次挂载时同步一次 DOM（内联脚本已经定好了首帧，这里只是把 React 状态
 * 跟实际 DOM 对齐）；之后切换会写入 localStorage，优先级高于系统偏好。
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = resolveTheme();
    setTheme(current);
    applyTheme(current);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      storeTheme(next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
