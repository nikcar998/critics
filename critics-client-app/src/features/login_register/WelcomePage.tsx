import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { useMediaQuery } from "react-responsive";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Header, Grid, Segment, Image } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { WelcomeNavbar } from "./WelcomeNavbar";

export default observer(function WelcomePage() {
  const { userStore } = useStore();

  const isDesktop = useMediaQuery({
    query: "(min-width: 1050px)",
  });

  if(userStore.isLoggedIn){
    return <Redirect to='/movies' />
  }

  return (
    <Fragment>
      <Grid divided>
        {/*************************  NAVBAR  ************************* */}
        <Grid.Row style={{ marginBottom: 30 }}>
          <WelcomeNavbar />
        </Grid.Row>
        <Grid.Row columns={isDesktop ? 2 : 1} style={{ margin: 0 }}>
          {/*************************  LEFT COLUMN  ************************* */}
          <Grid.Column
            width={isDesktop ? 13 : 15}
            verticalAlign="middle"
            textAlign="center"
            style={{ paddingRight: 10, paddingBottom: 15, paddingLeft: 30 }}
          >
            <Segment.Group>
              <Segment>
                <Header as="h1">Welcome in Critics!</Header>
              </Segment>
              <Segment>
                <Image
                  src="/images/welcomeImage.jpg"
                  size="huge"
                  centered
                ></Image>
              </Segment>
              <Segment>
                <Header as="h5">
                  This is a social network where you can share your opinion
                  about movies. Meet new people and express yourself!{" "}
                </Header>
              </Segment>
              <Segment>
                This website uses{" "}
               <a href="https://www.themoviedb.org/" target="_blank" >
                <Image  src="/images/TMDB_logo.png" style={{width:60,height:23}} inline />
                </a>  as
                second database to store the movies you will use to write your
                own opinions
              </Segment>
            </Segment.Group>
          </Grid.Column>

          {/************************* RIGHT COLUMN WITH FORMS   ************************* */}
          <Grid.Column width={isDesktop ? 3 : 15}>
            <LoginForm />
            <RegisterForm />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Fragment>
  );
});
