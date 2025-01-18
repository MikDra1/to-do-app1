import styled from "styled-components";
import { useList } from "../contexts/ListProvider";
import TodoItem from "./TodoItem";
import { useTodo } from "../contexts/TodoProvider";
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

const Container = styled.div`
  margin-inline: 2rem;
  box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  transform: translateY(-3rem);
  overflow: hidden;
  max-width: 40rem;
  background-color: ${(props) => props.theme.background};

  & > *:not(:last-child) {
    border-bottom: 0.8px solid
      ${(props) =>
        props.isLightTheme ? "rgb(230,229,233)" : "hsl(233, 14%, 35%)"};
  }

  @media (min-width: 400px) {
    margin-inline: 3rem;
  }

  @media (min-width: 600px) {
    margin-inline: 4rem;
  }

  @media (min-width: 800px) {
    margin-inline: auto;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  color: ${(props) => props.theme.text};
`;

const ClearCompletedButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.text};
  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    color: ${(props) => props.theme.hoverText};
  }
`;
const Link = styled.p`
  color: ${(props) => props.theme.text};
  font-weight: 600;
  cursor: pointer;

  transition: all 0.3s;

  &:hover {
    color: ${(props) => props.theme.hoverText};
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

function List() {
  const {
    list,
    setList,
    activeTodos,
    completedTodos,
    handleClearCompleted,
    whatToShow,
    setWhatToShow,
  } = useList();

  const { isMobile, isLightTheme } = useTodo();

  const listToShow =
    whatToShow === "completed"
      ? completedTodos
      : whatToShow === "active"
      ? activeTodos
      : list;

  function getTaskPos(id) {
    return list.findIndex((task) => task.id === id);
  }

  function handleDragEnd(e) {
    const { active, over } = e;

    if (active.id === over.id) return;

    setList((list) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(list, originalPos, newPos);
    });
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <Container isLightTheme={isLightTheme}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={listToShow}
          strategy={verticalListSortingStrategy}
        >
          {listToShow.map(({ id, text, completed }) => (
            <TodoItem key={id} id={id} text={text} completed={completed} />
          ))}
        </SortableContext>
      </DndContext>
      <Flex>
        <p>
          {activeTodos.length} item{listToShow.length > 1 && "s"} left
        </p>
        {isMobile || (
          <ActionsContainer>
            <Link
              className={whatToShow === "all" && "blueColor"}
              onClick={() => setWhatToShow("all")}
            >
              All
            </Link>
            <Link
              className={whatToShow === "active" && "blueColor"}
              onClick={() => setWhatToShow("active")}
            >
              Active
            </Link>
            <Link
              className={whatToShow === "completed" && "blueColor"}
              onClick={() => setWhatToShow("completed")}
            >
              Completed
            </Link>
          </ActionsContainer>
        )}
        <ClearCompletedButton onClick={handleClearCompleted}>
          Clear Completed
        </ClearCompletedButton>
      </Flex>
    </Container>
  );
}

export default List;
