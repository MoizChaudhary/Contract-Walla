// import React, {createContext, useState, useContext} from 'react';

// const defaultContextValue = {
//   theme: 'light',
//   toggleTheme: () => {}, // Default to an empty function
// };
// const ThemeContext = createContext(defaultContextValue);

// export const ThemeProvider = ({children}: any) => {
//   const [theme, setTheme] = useState('light'); // Default to light mode

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <ThemeContext.Provider value={{theme, toggleTheme}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => useContext(ThemeContext);
import React, {createContext, useState, useContext, ReactNode} from 'react';

// Define the shape of the context value
interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Provide a default value for context
const defaultContextValue: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const ThemeProvider = ({children}: {children: ReactNode}) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light'); // Default to light mode

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
