import { useMediaQuery } from "react-responsive";
import { Menu, Container, Icon } from "semantic-ui-react";

export const WelcomeNavbar = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  return (
    <>
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header>
            <Icon name="film" />
            Critics
          </Menu.Item>
        </Container>
      </Menu>
    </>
  );
};
