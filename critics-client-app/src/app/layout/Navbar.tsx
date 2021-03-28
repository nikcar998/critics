import { Container, Icon, Menu } from "semantic-ui-react";
import { useMediaQuery } from "react-responsive";
import { DropdownOptions } from "./DropdownOptions";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const isDesktop = useMediaQuery({
    query: "(max-width: 1050px)",
  });

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <Icon name="film" />
          Critics
        </Menu.Item>
        <Menu.Item  > <Link to="/movies">Movies</Link></Menu.Item>
        <Menu.Item > <Link to="/reviews">Reviews</Link></Menu.Item>
        {isDesktop && (
         <DropdownOptions />
        )}
      </Container>
    </Menu>
  );
};
