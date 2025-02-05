import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as RNEThemeProvider, createTheme } from "@rneui/themed";

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const theme = createTheme({
    mode,
    lightColors: {
        primary: '#0a7ea4',
        secondary: '#687076',
        background: '#ffffff',
      },
      darkColors: {
        primary: '#ffffff',
        secondary: '#9BA1A6',
        background: '#151718',
      },
  });

  const toggleTheme = () => {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <RNEThemeProvider theme={theme} >
        {children}
      </RNEThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};