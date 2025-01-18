/* eslint-disable react/prop-types */
import styled from "styled-components";
import { useList } from "../contexts/ListProvider";

const CircleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100vw;
  border: 1px solid ${(props) => props.theme.circle};
  cursor: pointer;
  background: ${(props) =>
    props.completed
      ? "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
      : ""};

  transition: all 0.3s;

  &:hover {
    border: 1px solid ${(props) => props.theme.text};
  }
`;

function Circle({ id, completed }) {
  const { handleChangeCompletedState } = useList();
  return (
    <CircleContainer
      completed={completed}
      onClick={() => handleChangeCompletedState(id)}
      onPointerDown={(e) => e.stopPropagation()}
    >
      {completed && <img src="./images/icon-check.svg" alt="" />}
    </CircleContainer>
  );
}

export default Circle;
