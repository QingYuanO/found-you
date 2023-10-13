'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Button } from '../ui/button';

export default function ThemeToggleBtn() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    if (theme === 'system') {
      const themeMedia = window.matchMedia('(prefers-color-scheme: light)');
      if (themeMedia.matches) {
        setTheme('light');
      } else {
        setTheme('dark');
      }
    }
    setMounted(true);
  }, [setTheme, theme]);

  if (!mounted) {
    return null;
  }
  return (
    <Button
      variant="outline"
      className=" fixed  bottom-5 right-5 z-50 flex-shrink-0 rounded-full text-lg opacity-90 shadow"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      size="icon"
    >
      {theme === 'light' ? <i className=" i-lucide-sun"></i> : <i className=" i-lucide-moon"></i>}
    </Button>
  );
}
