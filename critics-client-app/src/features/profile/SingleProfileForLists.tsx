import React from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Header, Image, Segment } from "semantic-ui-react";
import { User } from "../../app/models/user";

// this component will show a single user in a list ( used in "ProfileList.tsx" and "FollowList.tsx")
interface Props {
  user: User;
}
export default function SingleProfileForLists({ user }: Props) {
  const bgColor = {
    backgroundImage:
      "linear-gradient(90deg, rgba(0,0,8,1) 0%, rgba(46,46,50,1) 35%, rgba(93,93,99,1) 100%)",
    color: "#F6EEEC",
  };
  //dafault avatar
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  return (
    <Segment
      style={{ ...bgColor, borderBottom: "1px solid white", padding: 0 }}
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
          content={user.username.slice(0, 20)}
          color="blue"
          style={{ display: "inline-block" }}
        />
      </Link>
      {/** if the screen is a desktop a part of the user's description is shown */}
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
}
