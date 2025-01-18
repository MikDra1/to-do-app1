import styled from "styled-components";
import CreateNewTodo from "./CreateNewTodo";
import { useTodo } from "../contexts/TodoProvider";

const Container = styled.div`
  background-image: ${(props) =>
    props.isLightTheme
      ? props.isMobile
        ? "url('./images/bg-mobile-light.jpg')"
        : "url('./images/bg-desktop-light.jpg')"
      : props.isMobile
      ? "url('./images/bg-mobile-dark.jpg')"
      : "url('./images/bg-desktop-dark.jpg')"};
  background-size: cover;
  background-repeat: no-repeat;
  padding-inline: 10vw;
  padding-bottom: 5rem;

  @media (min-width: 600px) {
    padding-top: 2rem;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 2rem;
  max-width: 40rem;
  margin-inline: auto;
`;

const Title = styled.h1`
  letter-spacing: 0.5rem;
  color: hsl(0, 0%, 98%);
  line-height: 1;
`;

const ThemeImageIcon = styled.img`
  cursor: pointer;
`;

function Header() {
  const { isMobile, isLightTheme, handleChangeTheme } = useTodo();

  return (
    <Container isMobile={isMobile} isLightTheme={isLightTheme}>
      <Flex>
        <Title>TODO</Title>
        <ThemeImageIcon
          onClick={handleChangeTheme}
          src={`./images/icon-${isLightTheme ? "moon" : "sun"}.svg`}
          alt=""
        />
      </Flex>
      <CreateNewTodo />
    </Container>
  );
}

export default Header;
