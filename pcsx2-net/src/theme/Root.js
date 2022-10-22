import React, { useEffect, useState } from 'react';
import { createTheme, NextUIProvider, getDocumentTheme } from '@nextui-org/react'

const lightTheme = createTheme({
  type: 'light',
  theme: {
    // colors: {...}, // optional
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    // colors: {...}, // optional
  }
})


// Default implementation, that you can customize
export default function Root({ children }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // you can use any storage
    let theme = window.localStorage.getItem('theme');
    console.log(`theme - ${theme}`);
    setIsDark(theme === 'dark');

    const observer = new MutationObserver((mutation) => {
      let newTheme = getDocumentTheme(document?.documentElement);
      console.log(`what - ${newTheme}`);
      setIsDark(newTheme === 'dark');
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style']
    });

    return () => observer.disconnect();
  }, []);

  return <NextUIProvider theme={isDark ? darkTheme : lightTheme} disableBaseline={true}>{children}</NextUIProvider>;
}
