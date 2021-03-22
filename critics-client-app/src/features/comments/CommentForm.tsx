import { useMediaQuery } from "react-responsive";
import { Form, Grid, Image, Segment } from "semantic-ui-react";

export const CommentForm = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });
  const defaultAvatarUrl =
  "/avatar-social-media-isolated-icon-design-vector-10704283.jpg";
  return (
    <Segment style={{ margin: 5 }} secondary >
      <Form>
        <Grid>
          <Grid.Row centered={isDesktop} columns={3} style={{ padding:"5 0" }}>
              <Grid.Column width={2} textAlign="right" verticalAlign="top" style={{padding:0,margin:0}}>
                  <Image src={defaultAvatarUrl} circular style={{width:25,height:25}} inline alt="film poster" />
              </Grid.Column>
            <Grid.Column width={12} style={{ marginBottom: 5,marginLeft:0,padding:0 }}>
              <Form.TextArea
                placeholder="Write Comment..."
                style={{ borderRadius: 20 }}
                inline
              />
            </Grid.Column>
            <Grid.Column
              width={1}
              verticalAlign="bottom"
              style={{ marginBottom: 7, marginLeft: 0, padding: 0 }}
            >
              <Form.Button compact primary style={{ margin: 0 }} icon="arrow right" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Segment>
  );
};
