import { useEffect, useState } from "react";
import { Button, Grid, Icon } from "semantic-ui-react";
import { useStore } from "../stores/store";

interface Props {
  store: string;
}
export const ButtonGroupNextBack = ({ store }: Props) => {
  const { filmStore, reviewStore } = useStore();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);

  useEffect(() => {
    switch (store) {
      case "filmStore":
        setPage(filmStore.page);
        filmStore.pagination && setTotalPages(filmStore.pagination.total_pages);
        break;
      case "reviewStore":
        setPage(reviewStore.page);
        reviewStore.reviewsPagination &&
          setTotalPages(reviewStore.reviewsPagination.last_page);
        break;
    }
  }, [filmStore, reviewStore, store]);
  const scrollPages = (nextORBack: boolean) => {
    switch (store) {
      case "filmStore":
        filmStore.setPage(nextORBack);
        window.scrollTo(0, 0);
        setPage(filmStore.page);
        break;
      case "reviewStore":
        reviewStore.setPage(nextORBack);
        window.scrollTo(0, 0);
        setPage(reviewStore.page);
        break;
    }
  };

  return (
    <Grid>
      <Grid.Column textAlign={"center"}>
        <Button.Group style={{ marginTop: "30px" }}>
          {page !== 1 && (
            <Button
              animated
              onClick={() => {
                scrollPages(false);
              }}
            >
              <Button.Content visible>Back</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow left" />
              </Button.Content>
            </Button>
          )}
          {totalPages > page && (
            <Button
              animated
              onClick={() => {
                scrollPages(true);
              }}
            >
              <Button.Content visible>Next</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          )}
        </Button.Group>
      </Grid.Column>
    </Grid>
  );
};