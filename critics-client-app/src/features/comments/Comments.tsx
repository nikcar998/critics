import React from 'react'
import { Header, Image, Segment } from 'semantic-ui-react'
import { Comment } from '../../app/models/comment'

interface Props {
    comment: Comment
}
export const Comments = ({comment}:Props) => {
    const defaultImageUrl = "/no_picture_available.jpg";
    return (
        <Segment.Group
        style={{
          marginLeft: 50,
          marginRight: 50,
          border: "2px solid red",
        }}
      >
        <Segment inverted>
          <Header as="h3">
            <Image
              src={
                comment.user.avatar
                  ? "http://127.0.0.1:8000/api/show/avatar?url=" +
                    comment.user.avatar
                  : defaultImageUrl
              }
              circular
              style={{ width: "30px", height: "30px" }}
              centered
            />
            {comment.user.name}
          </Header>
        </Segment>
        <hr
          style={{
            margin: 0,
            color: "grey",
            backgroundColor: "grey",
            height: 1,
          }}
        />
        <Segment inverted>
          <Header style={{ marginLeft: "15px" }} as="h5">
            {comment.body}
          </Header>
        </Segment>
      </Segment.Group>
    )
}
