"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex gap-2">
      {/* The current theme is: {theme}
      <button
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      >
        Mode
      </button> */}
    </div>
  );
};

export default ThemeSwitcher;
