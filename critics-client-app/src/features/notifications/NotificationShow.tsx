import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Icon, Segment, Grid, Header, SemanticICONS } from "semantic-ui-react";
import { Notification } from "../../app/models/notification";

//this component will show a single notification (it is used in the "NotificationsList.tsx" component)
interface Props {
  notification: Notification;
}
export default function NotificationShow({ notification }: Props) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const [IconName, setIconName] = useState<SemanticICONS>("comments");
  const [destinationUrl, setDestinationUrl] = useState("");

  //depending on whitch type of notification this component get, the icon and
  //the destination URL will change
  useEffect(() => {
    switch (notification.data.type) {
      case "reply":
        setIconName("comments");
        setDestinationUrl("/comment/" + notification.data.target_id);
        break;
      case "comment":
        setIconName("comment");
        setDestinationUrl("/reviews/" + notification.data.target_id);
        break;
      case "follows":
        setIconName("users");
        setDestinationUrl("/profile/" + notification.data.target_id);
        break;
      case "like to comment":
        setIconName("like");
        setDestinationUrl("/comment/" + notification.data.target_id);
        break;
      case "like to review":
        setIconName("like");
        setDestinationUrl("/reviews/" + notification.data.target_id);
        break;
    }
  }, [notification]);

  return (
    <Link to={destinationUrl}>
      <Segment
        style={
          isDesktop
            ? {
                padding: "5px 10px",
                backgroundColor: "#F6EEEC",
                width: "87%",
                margin: " 5px auto",
              }
            : {
                padding: "5px 10px",
                backgroundColor: "#F6EEEC",
                width: "100%",
                margin: "10px auto",
              }
        }
      >
        <Grid>
          <Grid.Row columns={2}>
            {/*** ICON SIDE */}
            <Grid.Column
              width={1}
              style={{
                padding: 1,
                margin: 0,
                borderRight: isDesktop ? "1px solid blue" : "none",
              }}
              textAlign="right"
            >
              <Icon
                name={IconName}
                color="teal"
                size="big"
                style={{ marginLeft: 5 }}
              />
            </Grid.Column>
            {/*** TEXT SIDE */}
            <Grid.Column
              width={14}
              verticalAlign="middle"
              style={{
                padding: "2px 5px 2px 25px",
              }}
            >
              <Header
                as={isDesktop ? "h3" : "h5"}
                color="blue"
                content={notification.data.message}
                style={{ display: "inline-block" }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Link>
  );
}
