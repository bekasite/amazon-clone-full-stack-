import React, { useState, createContext, useContext } from 'react';

const colorContext = createContext();

export const useColor = () => {
  return useContext(colorContext);
}; //hooks

export const ThemeProvider = ({ children }) => {
  const [color, setColor] = useState('light');
  const colorToggler = () => {
    setColor(prev => (prev == 'light' ? 'dark' : 'light'));
  };

  return (
    <colorContext.Provider value={{ color, colorToggler }}>
      {children}
    </colorContext.Provider>
  );
};
