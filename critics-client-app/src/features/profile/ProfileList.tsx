import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileList() {
  const { userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const bgImage = "/images/cool-background.png";
  const bgColor = { backgroundImage: `url(${bgImage})`, color: "#F6EEEC" };
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  useEffect(() => {
    userStore.listUser();
  }, [userStore]);
  return userStore.users[0] ? (
    <Segment.Group>
      {userStore.users.map((user) => {
        return (
          <Segment
            style={{ ...bgColor, borderBottom: "solid 1px", padding: 0 }}
            key={user.id}
          >
            <Link to={"/profile/" + user.id}>
              <Image
                src={
                  user.avatar
                    ? "http://127.0.0.1:8000/api/show/avatar?url=" + user.avatar
                    : defaultImageUrl
                }
                circular
                inline
                centered
                style={{
                  margin: "0px 6px 10px",
                  widht: "40px",
                  height: "40px",
                }}
              />
              <Header
                as="h2"
                content={user.username}
                color="red"
                style={{ display: "inline-block" }}
              />
            </Link>

            {isDesktop && (
              <Header
                as="h3"
                content={
                  user.description && user.description.length > 50
                    ? user.description.slice(0, 49) + "..."
                    : user.description
                }
                style={{ color: "#F6EEEC", marginLeft: 30, display: "inline-block" }}
              />
            )}
          </Segment>
        );
      })}
    </Segment.Group>
  ) : null;
});
