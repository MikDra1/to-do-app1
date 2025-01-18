/* eslint-disable react/prop-types */
import useScreenSize from "../hooks/useScreenSize";
import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const TodoContext = createContext();

function TodoProvider({ children }) {
  const [isMobile, setIsMobile] = useState(null);
  const [isLightTheme, setIsLightTheme] = useState(
    localStorage.getItem("isLightTheme")
      ? JSON.parse(localStorage.getItem("isLightTheme"))
      : true
  );
  const screenSize = useScreenSize();

  useEffect(
    function () {
      setIsMobile(screenSize.width <= 600);
    },
    [screenSize.width]
  );

  function handleChangeTheme() {
    setIsLightTheme(!isLightTheme);
    localStorage.setItem("isLightTheme", !isLightTheme);
  }

  return (
    <TodoContext.Provider
      value={{
        isMobile,
        isLightTheme,
        setIsLightTheme,
        handleChangeTheme,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined)
    throw new Error("TodoContext was used outside the TodoProvider");
  return context;
}

export { TodoProvider, useTodo };
