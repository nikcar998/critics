import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Segment, Header, Image, Button } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { User } from "../../app/models/user";

interface Props {
  followingOrFollowers: boolean;
}

export default function FollowList({ followingOrFollowers }: Props) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [controlVar, setControlVar] = useState(0);
  const bgColor = {
    background:
      "linear-gradient(90deg, rgba(0,0,8,1) 0%, rgba(46,46,50,1) 35%, rgba(93,93,99,1) 100%)",
    color: "#F6EEEC",
  };
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  useEffect(() => {
    if (followingOrFollowers) {
      agent.Follow.listFollowing(page).then((resp) => {
        setUsers(resp.data);
        setPage(resp.current_page);
        setLastPage(resp.last_page);
        setLoading(false);
      });
    } else {
      agent.Follow.listFollowers(page).then((resp) => {
        setUsers(resp.data);
        setPage(resp.current_page);
        setLastPage(resp.last_page);
        setLoading(false);
      });
    }
    setLoading(true);
    console.log(users[0]);
  }, [controlVar]);
  return users[0] !== undefined ? (
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
        {lastPage > page && (
          <Button
            icon="arrow right"
            style={{ float: "right" }}
            primary
            onClick={() => {
              setPage(page + 1);
              setControlVar(controlVar + 1);
            }}
          />
        )}
        {page > 1 && (
          <Button
            icon="arrow left"
            style={{ float: "left" }}
            primary
            onClick={() => {
              setPage(page - 1);
              setControlVar(controlVar - 1);
            }}
          />
        )}
      </Segment.Group>
    </>
  ) : (
    <LoadingComponent />
  );
}
