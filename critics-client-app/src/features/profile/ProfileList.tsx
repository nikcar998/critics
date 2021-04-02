import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Header, Image, Input, Segment } from "semantic-ui-react";
import { ButtonGroupNextBack } from "../../app/layout/ButtonGroupNextBack";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";
import { useStore } from "../../app/stores/store";

export default observer(function ProfileList() {
  const { userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const [users, setUsers] = useState<User[]>([]);

  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    userStore.searchUsers(event.currentTarget.value).then(() => {
      setUsers(userStore.users);
    });
  };

  const bgColor = {
    backgroundImage:
      "linear-gradient(90deg, rgba(0,0,8,1) 0%, rgba(46,46,50,1) 35%, rgba(93,93,99,1) 100%)",
    color: "#F6EEEC",
  };
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  useEffect(() => {
    userStore.listUser().then(() => {
      setUsers(userStore.users);
    });
  }, [userStore, userStore.page]);
  return userStore.users[0] ? (
    <>
      <Segment.Group>
        <Input
          fluid
          icon="search"
          placeholder="Search..."
          onChange={(event) => {
            handleSearchInput(event);
          }}
          loading={userStore.loading}
          style={{ margin: 5, marginBottom: 15 }}
        />
        {!userStore.loading ? (
          users.map((user) => {
            return (
              <Segment
                style={{ ...bgColor, borderBottom: "solid 1px", padding: 0 }}
                key={user.id}
              >
                <Link to={"/profile/" + user.id}>
                  <Image
                    src={
                      user.avatar
                        ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                          user.avatar
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
                    style={{
                      color: "#F6EEEC",
                      marginLeft: 30,
                      display: "inline-block",
                    }}
                  />
                )}
              </Segment>
            );
          })
        ) : (
          <div style={{ height: 400 }}>
            <LoadingComponent content="Loading users..." />
          </div>
        )}
      </Segment.Group>

      <ButtonGroupNextBack store="userStore" />
    </>
  ) : (
    <LoadingComponent />
  );
});
