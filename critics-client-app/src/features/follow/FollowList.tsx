import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Segment, Header, Image } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";

export default function FollowList() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const bgImage = "/images/cool-background.png";
  const bgColor = { backgroundImage: `url(${bgImage})`, color: "#F6EEEC" };
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  useEffect(() => {
    setLoading(true);
    agent.Follow.listFollowing().then((resp) => {
      setUsers(resp.data);
      setLoading(false);
    });
  }, []);
  return users[0] ? (
    <>
      <Segment.Group>
        {!loading ? (
          users.map((user) => (
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
          ))
        ) : (
          <div style={{ height: 400 }}>
            <LoadingComponent content="Loading users..." />
          </div>
        )}
      </Segment.Group>
    </>
  ) : (
    <LoadingComponent />
  );
}
