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
    setIsDark(theme === 'dark');

    const observer = new MutationObserver((mutation) => {
      // console.log(mutation);
      let newTheme = getDocumentTheme(document?.documentElement);
      if (newTheme === 'dark') {
        if (!document?.documentElement.classList.contains("dark-theme")) {
          console.log("changing class list!")
          document?.documentElement.classList.add('dark-theme');
        }
        setIsDark(true);
      } else {
        setIsDark(false);
      }
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'style', "class"]
    });

    return () => observer.disconnect();
  }, []);

  return <NextUIProvider theme={isDark ? darkTheme : lightTheme} disableBaseline={true}>{children}</NextUIProvider>;
}
