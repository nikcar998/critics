import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Segment, Header, Divider, Grid } from "semantic-ui-react";
import { LoadingComponent } from "../../app/layout/LoadingComponent";
import { Comment } from "../../app/models/comment";
import { useStore } from "../../app/stores/store";
import CommentForm from "./CommentForm";
import Comments from "./Comments";

export default observer(function CommentShow() {
  const { id } = useParams<{ id: string }>();

  const [comment, setComment] = useState<Comment | null>(null);
  const [replies, setReplies] = useState<Comment[]>([]);

  const { commentStore, userStore } = useStore();

  useEffect(() => {
    commentStore.loadComment(id).then(() => {
      if (commentStore.selectedComment) {
        setComment(commentStore.selectedComment);
        setReplies(commentStore.selectedComment.replies);
      }
      console.log(commentStore.selectedComment);
    });

    console.log(commentStore.selectedComment);
  }, [commentStore, id]);

  return (
    <>
      {comment && comment.user ? (
        <>
          <Segment inverted>
            <Comments comment={comment} showOrNot={true} />
          </Segment>

          {/*********************************** COMMENT FORM ************************ */}
          <Grid style={{ padding: 10 }}>
            <Grid.Row>
              <Grid.Column>
                <CommentForm
                  comments={replies}
                  setComments={setReplies}
                  user={userStore.user ? userStore.user : comment.user}
                  parent_comment={comment}
                />
                <Segment color="black" inverted>
                  <Header as="h3">Replies:</Header>
                  <Divider />

                  {/*********************************** REPLIES INDEX ************************ */}

                  {commentStore.loading ? (
                    <LoadingComponent />
                  ) : (
                    replies.map((comment) => {
                      if (comment.parent_id) {
                        return (
                          <Comments
                            showOrNot={true}
                            comment={comment}
                            key={comment.id}
                          />
                        );
                      } else {
                        return null;
                      }
                    })
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </>
      ) : (
        <LoadingComponent />
      )}
    </>
  );
});
