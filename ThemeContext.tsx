import { createContext } from "react";

const defaultValue = {
    theme: 'light',
    setTheme: (theme: 'light' | 'dark') => {},
}

const ThemeContext = createContext(defaultValue);

export default ThemeContext;
