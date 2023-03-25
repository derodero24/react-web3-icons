import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';

export default function ThemeButton(props: { className: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  } else if (currentTheme === 'light') {
    return <MdOutlineDarkMode {...props} onClick={() => setTheme('dark')} />;
  } else {
    return <MdOutlineLightMode {...props} onClick={() => setTheme('light')} />;
  }
}
