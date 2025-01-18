import styled, { ThemeProvider } from "styled-components";
import ActionTabs from "./components/ActionTabs";
import Header from "./components/Header";
import List from "./components/List";
import { lightTheme, darkTheme } from "./styles/theme";
import { ListProvider } from "./contexts/ListProvider";
import { useTodo } from "./contexts/TodoProvider";

const Container = styled.div`
  min-height: 100vh;
  background-color: ${(props) => (props.isLightTheme ? "#fafafa" : "#181824")};
`;

const DragAndDropText = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: ${(props) => props.theme.text};
`;

function App() {
  const { isLightTheme } = useTodo();
  const theme = isLightTheme ? "light" : "dark";

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ListProvider>
        <Container isLightTheme={isLightTheme}>
          <Header />
          <List />
          <ActionTabs />
          <DragAndDropText>Drag and drop to reorder list</DragAndDropText>
        </Container>
      </ListProvider>
    </ThemeProvider>
  );
}

export default App;
