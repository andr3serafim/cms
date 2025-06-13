"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ToggleThemeSwitch = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Só renderiza o botão “funcional” depois da hidratação
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        aria-label="Carregando alternador de tema"
        className="p-2 border rounded-md bg-gray-100 dark:bg-gray-800 cursor-not-allowed transition"
      >
        <Sun className="h-5 w-5 text-gray-400 dark:text-gray-600" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  // Definições de classe separadas para cada tema
  const baseClasses = "p-2 border rounded-md transition flex items-center justify-center";
  const lightClasses =
    "bg-white hover:bg-gray-100 border-gray-300 text-gray-800";
  const darkClasses =
    "bg-gray-800 hover:bg-gray-700 border-gray-600 text-gray-200";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Mudar para tema claro" : "Mudar para tema escuro"}
      className={`${baseClasses} ${isDark ? darkClasses : lightClasses}`}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ToggleThemeSwitch;
