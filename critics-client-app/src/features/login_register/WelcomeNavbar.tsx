import { Menu, Container, Icon } from "semantic-ui-react";

//this is the navbar shown in whe "WelcomPage.tsx" component, it is useful only for aesthetics purposes
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
