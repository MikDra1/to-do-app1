import styled from "styled-components";
import { useList } from "../contexts/ListProvider";
import { useTodo } from "../contexts/TodoProvider";

const Input = styled.input`
  border: none;
  line-height: 1;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.isLightTheme ? '#000' : "hsl(233, 11%, 84%)"};
  padding-block: .3rem;
width: fit-content;
  &:focus-visible {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.text};
  }

  @media (min-width: 400px) {
  width: 100%;

  }
`;

const Circle = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100vw;
  border: 1px solid ${(props) => props.theme.circle};
`;

const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1rem;
  background-color: ${(props) => props.theme.background};
  width: 100%;
  padding: 1rem;
  border-radius: 0.35rem;
  line-height: 1;
  overflow: hidden;
  max-width: 40rem;
  margin-inline: auto;

  @media (min-width: 400px) {
    display: flex;
  }
`;

function CreateNewTodo() {
  const { handleNewTodo } = useList();
  const { isLightTheme } = useTodo();
  return (
    <form onSubmit={handleNewTodo}>
      <InputContainer>
        <Circle />
        <Input isLightTheme={isLightTheme} type="text" placeholder="Create a new todo..." />
      </InputContainer>
    </form>
  );
}

export default CreateNewTodo;
