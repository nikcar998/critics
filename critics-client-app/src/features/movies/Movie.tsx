import React, { Fragment, useState } from "react";
import { Button, Card, Icon, Image, Transition } from "semantic-ui-react";
import { Film } from "../../app/models/film";

interface IProps {
  oneFilm: Film;
}
export const Movie: React.FC<IProps> = ({ oneFilm }) => {
  const [isClicked, setIsClicked] = useState(true);
  const [visible, setVisible] = useState(true);
  const [visibleImage, setVisibleImage] = useState(true);

  const imageUrl = "https://image.tmdb.org/t/p/w500" + oneFilm.poster_path;
  const defaultImageUrl = "/no_picture_available.jpg"

  return (
    <Card
      key={oneFilm.id}
      style={{
        margin: "10px",
        width: "225px",
        maxHeight: 400,
        overflow: "auto",
      }}
    >
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
            style={{height:"100%"}}
          />
        </Transition>
      ) : (
        <Transition
          visible={visible}
          animation="horizontal flip"
          duration={500}
        >
          <Fragment>
            <Card.Content onClick={() => {}}>
              <Card.Header>{oneFilm.title}</Card.Header>
              <Card.Meta>
                <span className="date">Released: {oneFilm.release_date}</span>
              </Card.Meta>
              <Card.Description>
                {oneFilm.overview.length > 271
                  ? (oneFilm.overview.slice(0, 270) + "...")
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
              <Button>
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
