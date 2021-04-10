import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { history } from "../..";
import {
  Button,
  Grid,
  GridRow,
  Header,
  Image,
  Segment,
} from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Comment } from "../../app/models/comment";
import { Like } from "../../app/models/like";

//this is the structure of a single comment used in a list

//these props
interface Props {
  comment: Comment;
  showOrNot?: boolean;
}
const Comments = ({ comment, showOrNot }: Props) => {
  const defaultImageUrl =
    "/images/avatar-social-media-isolated-icon-design-vector-10704283.jpg";

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  const likeNumberControl = comment.likes ? comment.likes.length : 0;
  const [likesNumber, setLikesNumber] = useState(
    comment.likes ? comment.likes.length : 0
  );

  //this is the necessary logic to understand if the user is adding a like or removing one.
  //TODO-> improve back-end logic to make these functions faster
  function handleNewLike() {
    agent.Likes.storeCommentLike(comment.id).then((resp) => {
      var addOrSub: Like[] | null[] = []
      if(comment.likes){
        addOrSub = comment.likes.filter((like) => {
          return like.id === comment.user_id;
        });
      }else{
        addOrSub = [null]
      }
        
        //necessary logic to handle likes
        if (addOrSub[0] != null) {
          likeNumberControl === likesNumber
            ?  setLikesNumber(likesNumber - 1)
            : setLikesNumber(likesNumber + 1);
        } else {
          likeNumberControl === likesNumber
            ? setLikesNumber(likesNumber + 1)
            :  setLikesNumber(likesNumber - 1);
        }
    });
  }
  return (
    <Grid>
      <GridRow columns={2}>
        {/**** here i show the user's avatar and two buttons to like the comment or see it 
         * as the main content of the page */}
        <Grid.Column
          width={isDesktop ? 1 : 3}
          verticalAlign="top"
          textAlign="right"
          style={{ paddingRight: 0 }}
        >
          {comment.user && (
            <Image
              src={
                comment.user.avatar
                  ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                    comment.user.avatar
                  : defaultImageUrl
              }
              circular
              style={{ width: "30px", height: "30px", marginBottom: 5 }}
              inline
              verticalAlign="top"
            />
          )}
          {/****************** here i will give the option to show this button or not. Useful to distinguish
           *  if the comment is in a list and when the comment is the main content of the page
           */}
          {!showOrNot && (
            <Button
              icon="eye"
              basic
              color="teal"
              compact
              circular
              size="small"
              onClick={() => {
                history.push("/comment/" + comment.id);
              }}
            />
          )}
          <Button
            icon="like"
            basic
            color="teal"
            compact
            circular
            size="small"
            style={{ marginTop: 3 }}
            onClick={() => {
              handleNewLike();
            }}
          />
        </Grid.Column>
        {/********* here i show user's username and the comment's text */}
        <Grid.Column
          width={isDesktop ? 14 : 13}
          style={{ marginLeft: 0, paddingLeft: 4 }}
        >
          <Segment
            inverted
            style={{
              border: "1px solid red",
              borderRadius: 15,
              marginBottom: 0,
              overflow:"auto",
              overflowWrap: 'break-word'
            }}
          >
            <Header as="h3" style={{ marginBottom: "5px" }}>
              {comment.user && comment.user.username}
            </Header>

            <Header style={{ margin: 0, marginLeft: "15px" }} as="h5">
              {comment.body}
            </Header>
          </Segment>
          <Header
            style={{
              display: "inline-block",
              margin: 1,
              padding: 0,
              color: "white",
            }}
            as="h6"
          >
            Likes:{likesNumber}{" "}
          </Header>{" "}
          <Header
            style={{ display: "inline-block", margin: 0, color: "white" }}
            as="h6"
          >
            {" "}
            Replies:{comment.replies ? comment.replies.length : 0}{" "}
          </Header>
        </Grid.Column>
      </GridRow>
    </Grid>
  );
};

export default observer(Comments);
