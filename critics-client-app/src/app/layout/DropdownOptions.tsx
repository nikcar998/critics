import React, { useEffect, useState } from "react";
import { history } from "../..";
import { Dropdown, Label, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { Link } from "react-router-dom";
import agent from "../api/agent";

//if the screen is not a desktop this will shown and Optionside will be hidden
//and the "optionSide" will be shown
export const DropdownOptions = () => {
  const { filmStore, userStore } = useStore();

  //useful to set the number of notifications
  const [numbOfNotifications, setNumbOfNotifications] = useState(0);

  //this function let the user change which kind of film to list without changing the routes
  const changeWhichMoviesToUpload = (filmKind: string) => {
    filmStore.changeWhatToLoad(filmKind);
    history.push("/");
  };

  useEffect(() => {
    agent.Notifications.countUreadNotifications().then((resp) => {
      setNumbOfNotifications(resp);
    });
  }, []);

  return (
    <Menu.Item position="right">
      <Dropdown
        icon="dropdown"
        direction="left"
        button
        className="icon "
        style={{ color: "red", backgroundColor: "#ebe8e8" }}
      >
        <Dropdown.Menu style={{ color: "red" }}>
          <Dropdown.Header
            as="h1"
            style={{ color: "red" }}
            icon="film"
            content="Film"
          />
          <Dropdown.Divider />
          <Dropdown.Item
            text="Now Playing"
            onClick={() => {
              changeWhichMoviesToUpload("nowPlaying");
            }}
          />
          <Dropdown.Item
            text="Popular"
            onClick={() => {
              changeWhichMoviesToUpload("popular");
            }}
          />
          <Dropdown.Item
            text="Top Rated"
            onClick={() => {
              changeWhichMoviesToUpload("top rated");
            }}
          />
          <Dropdown.Divider />
          {/********************************** Reviews ************ */}
          <Dropdown.Header
            as="h1"
            style={{ color: "red" }}
            icon="th list"
            content="Reviews"
          />
          <Dropdown.Divider />
          <Dropdown.Item as={Link} to="/reviews" text="Timeline" />
          <Dropdown.Item as={Link} to="/reviews/all" text="All" />
          <Dropdown.Divider />
          {/************************** Profile *****************/}
          <Dropdown.Header
            as="h1"
            style={{ color: "red" }}
            icon="user outline"
            content="Profile"
          />
          <Dropdown.Divider />
          <Dropdown.Item
            as={Link}
            to={"/profile/" + userStore.user?.id}
            text="My Profile"
          ></Dropdown.Item>
          <Dropdown.Item as={Link} to={"/profile/edit"} text="Edit" />
          <Dropdown.Item as={Link} to={"/profile/list/users"} text="List" />
          <Dropdown.Item as={Link} to="/followers" text="Followers" />
          <Dropdown.Item as={Link} to="/following" text="Following" />
          <Dropdown.Item
            as={Link}
            to="/notifications"
            onClick={() => {
              setNumbOfNotifications(0);
            }}
          >
            Notifications{" "}
            <Label
              style={{ margin: "auto" }}
              circular
              color="red"
              content={numbOfNotifications}
            />
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              userStore.logout();
            }}
            text="Logout"
          />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};
