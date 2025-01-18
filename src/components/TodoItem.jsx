/* eslint-disable react/prop-types */
import styled from "styled-components";
import Circle from "./Circle";
import { useList } from "../contexts/ListProvider";
import { useTodo } from "../contexts/TodoProvider";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: #fff;
  width: 100%;
  padding: 1.5rem 1rem;
  line-height: 1;
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10 and IE 11 */
  user-select: none; /* Standard syntax */
  background-color: ${(props) => props.theme.background};
  touch-action: none;
  position: relative;
  cursor: grab;

  @media (min-width: 1000px) {
    &:hover img {
      opacity: 1;
    }
  }
`;

const Text = styled.p`
  color: ${(props) =>
    props.isLightTheme
      ? props.completed
        ? props.theme.lightText
        : "#000"
      : props.completed
      ? props.theme.text
      : "hsl(233, 11%, 84%)"};
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  cursor: pointer;
  font-size: 1.1rem;
`;

const Flex = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 1rem;
`;

const CrossImage = styled.img`
  cursor: pointer;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  @media (min-width: 1000px) {
    opacity: 0;
    transition: all 0.3s;
  }
`;

function TodoItem({ id, text, completed }) {
  const { handleDelete, handleChangeCompletedState } = useList();
  const { isLightTheme } = useTodo();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <InputContainer
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <Flex>
        <Circle id={id} completed={completed} />

        <Text
          onClick={() => handleChangeCompletedState(id)}
          onPointerDown={(e) => e.stopPropagation()}
          completed={completed}
          isLightTheme={isLightTheme}
        >
          {text}
        </Text>
      </Flex>
      <CrossImage
        onClick={() => handleDelete(id)}
        src="./images/icon-cross.svg"
        alt=""
        onPointerDown={(e) => e.stopPropagation()}
      />
    </InputContainer>
  );
}

export default TodoItem;
