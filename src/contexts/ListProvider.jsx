/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { createContext } from "react";

const ListContext = createContext();

function ListProvider({ children }) {
  const [list, setList] = useState(
    localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : []
  );
  const [whatToShow, setWhatToShow] = useState("all");
  const activeTodos = list.filter((item) => !item.completed);
  const completedTodos = list.filter((item) => item.completed);

  function handleNewTodo(e) {
    e.preventDefault();
    const id = Math.random() + Date.now();
    const item = { id, text: e.target[0].value, completed: false };
    setList([...list, item]);
    localStorage.setItem("list", JSON.stringify([...list, item]));
    e.target[0].value = "";
  }

  function handleChangeCompletedState(id) {
    const item = list.filter((item) => item.id === id)[0];
    item.completed = !item.completed;
    setList([...list]);
    localStorage.setItem("list", JSON.stringify([...list]));
  }

  function handleClearCompleted() {
    const filteredList = list.filter((item) => !item.completed);
    setList(filteredList);
    localStorage.setItem("list", JSON.stringify(filteredList));
  }

  function handleDelete(id) {
    const filteredList = list.filter((item) => item.id !== id);
    setList(filteredList);
    localStorage.setItem("list", JSON.stringify(filteredList));
  }

  return (
    <ListContext.Provider
      value={{
        list,
        setList,
        handleNewTodo,
        handleChangeCompletedState,
        activeTodos,
        completedTodos,
        handleDelete,
        handleClearCompleted,
        whatToShow,
        setWhatToShow,
      }}
    >
      {children}
    </ListContext.Provider>
  );
}

function useList() {
  const context = useContext(ListContext);
  if (context === undefined)
    throw new Error("ListContext was used outside the ListProvider");
  return context;
}

export { ListProvider, useList };
