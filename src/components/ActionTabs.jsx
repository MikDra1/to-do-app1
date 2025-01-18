import styled from "styled-components";
import { useList } from "../contexts/ListProvider";
import { useTodo } from "../contexts/TodoProvider";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-inline: 2rem;
  box-shadow: 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.1);
  padding-block: 0.75rem;
  border-radius: 0.5rem;
  margin-top: 1rem;
  transform: translateY(-3rem);
  max-width: 40rem;
  background-color: ${(props) => props.theme.background};

  @media (min-width: 400px) {
    margin-inline: 3rem;
  }

  @media (min-width: 600px) {
    margin-inline: auto;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.text};
  font-weight: 600;
  cursor: pointer;
  transition: all .3s;

  &:hover {
    color: ${(props) => props.theme.hoverText};

  }
`;

function ActionTabs() {
  const { setWhatToShow, whatToShow } = useList();

  const { isMobile } = useTodo();

  if (!isMobile) return null;

  return (
    <Container>
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
    </Container>
  );
}

export default ActionTabs;
