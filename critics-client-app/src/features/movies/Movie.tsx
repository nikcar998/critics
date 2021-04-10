import React, { Fragment, useState } from "react";
import { history } from "../..";
import { Button, Card, Icon, Image, Transition } from "semantic-ui-react";
import { Film } from "../../app/models/film";
import { useStore } from "../../app/stores/store";


//this component will show a single film (it is used in "MoviesList.tsx" map function)
//firstly it will show film's poster, if clicked will show a preview of title and description
interface Props {
  oneFilm: Film;
}
export const Movie = ({ oneFilm }: Props) => {
  const { filmStore } = useStore();

  //this function will select the film and redirect the user to the "ReviewForm.tsx", with all the 
  //necessary values for the form. This is the only way to access "ReviewForm.tsx" component
  const changeSelectedFilm = (id: number) => {
    filmStore.selectFilm(id).then(() => {
      history.push("/reviews/store");
    });
  };

  //these states are useful to understand if show the poster or the informations
  const [isClicked, setIsClicked] = useState(true);
  const [visible, setVisible] = useState(true);
  const [visibleImage, setVisibleImage] = useState(true);

  //to show the poster i will use this simple link
  const imageUrl = "https://image.tmdb.org/t/p/w500" + oneFilm.poster_path;
  //if there is no poster a default image will be shown
  const defaultImageUrl = "/images/no_picture_available.jpg";

  return (
    <Card
      key={oneFilm.id}
      style={{
        margin: "10px",
        width: "225px",
        maxHeight: 400,
        overflow: "auto",
        cursor: "pointer",
      }}
    >
      {/********* POSTER-SIDE */}
      {isClicked ? (
        <Transition
          visible={visibleImage}
          animation="horizontal flip"
          duration={500}
        >
          <Image
            src={oneFilm.poster_path ? imageUrl : defaultImageUrl}
            centered
            onClick={() => {
              setVisibleImage(false);
              setTimeout(() => {
                setIsClicked(false);
                setVisible(true);
              }, 500);
            }}
            style={{ height: "100%" }}
          />
        </Transition>
      ) : (           
        <Transition
          visible={visible}
          animation="horizontal flip"
          duration={500}
        >
          {/********* INFORMATIONS-SIDE */}
          <Fragment>
            <Card.Content onClick={() => {}}>
              <Card.Header>{oneFilm.title}</Card.Header>
              <Card.Meta>
                <span className="date">Released: {oneFilm.release_date}</span>
              </Card.Meta>
              <Card.Description>
                {oneFilm.overview.length > 271
                  ? oneFilm.overview.slice(0, 270) + "..."
                  : oneFilm.overview}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                icon="caret square left"
                onClick={() => {
                  setVisible(false);
                  setTimeout(() => {
                    setIsClicked(true);
                    setVisibleImage(true);
                  }, 500);
                }}
              />
              <Button
                onClick={() => {
                  changeSelectedFilm(oneFilm.id);
                }}
              >
                <Icon name="address card" />
                Create review
              </Button>
            </Card.Content>
          </Fragment>
        </Transition>
      )}
    </Card>
  );
};
