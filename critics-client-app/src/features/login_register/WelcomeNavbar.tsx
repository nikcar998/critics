import { Menu, Container, Icon } from "semantic-ui-react";

export const WelcomeNavbar = () => {
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
