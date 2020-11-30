import React from "react";
import { useHistory } from "react-router-dom";
import { Box, Button, makeStyles } from "@material-ui/core";
import {
  PageContainer,
  FixedTopBar,
  FixedMiddleBodyWithVerticalScroll,
} from "../components/Layout";
import { SUBTITLES, TITLES } from "../constants";

const useStyles = makeStyles({
  root: {
    height: 50,
    width: "100%",
    marginTop: "1rem",
  },
});

export const Home = () => {
  const history = useHistory();
  const classes = useStyles();

  const handleHomePageClick = () => history.push("/sources");

  return (
    <PageContainer>
      <FixedTopBar
        title={TITLES.homePage}
        subtitle={SUBTITLES.homePage}
        showMenu={false}
      />
      <FixedMiddleBodyWithVerticalScroll>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            className={classes.root}
            onClick={handleHomePageClick}
          >
            Import data
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.root}
            onClick={handleHomePageClick}
          >
            Lookup data
          </Button>
        </Box>
      </FixedMiddleBodyWithVerticalScroll>
    </PageContainer>
  );
};
