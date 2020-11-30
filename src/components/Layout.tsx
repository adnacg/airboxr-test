import React from "react";
import {
  Box,
  IconButton,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { Home, ArrowBack, Chat } from "@material-ui/icons";

interface TopBarProps {
  onLeftButtonClick?: () => void | Promise<void>;
  onHomeButtonClick?: () => void | Promise<void>;
  title: string;
  subtitle: string;
  showMenu: boolean;
}

export const onLeftButtonClickFactory = (history: any) => () =>
  history.goBack();
export const onHomeButtonClickFactory = (history: any) => () =>
  history.push("/");

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#CDCDCD",
    position: "fixed",
    paddingTop: "0.3rem",
    paddingBottom: "0.3rem",
    marginBottom: "0.3rem",
  },
  chatbox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
    width: "4rem",
    borderRadius: theme.shape.borderRadius,
    marginRight: "0.5rem",
    padding: "0.2rem 0.8rem",
    fontSize: theme.typography.subtitle2.fontSize,
  },
  homeIcon: {
    paddingLeft: "1rem",
  },
  chatIcon: { height: "1rem", width: "1rem" },
  titleBar: {
    padding: "1rem",
    top: "2rem",
    right: 0,
    bottom: "auto",
    left: 0,
    position: "fixed",
    height: "8rem",
    textAlign: "left",
  },
  homeTitleBar: { top: 0 },
  subtitle: {
    padding: "1rem 0",
    lineHeight: "1rem",
  },
  bottomContainer: {
    padding: "1rem",
    height: "3rem",
    top: "auto",
    right: 0,
    bottom: 0,
    left: 0,
    position: "fixed",
  },
  nextButton: { height: "3rem", width: "100%" },
  body: {
    padding: "0 1rem",
    top: "11rem",
    right: 0,
    bottom: 65,
    left: 0,
    position: "fixed",
    overflowY: "scroll",
  },
}));

export const FixedTopBar: React.FunctionComponent<TopBarProps> = (props) => {
  const classes = useStyles();
  return (
    <>
      {props.showMenu ? (
        <Box
          display="flex"
          flexDirection="row"
          height="1.5rem"
          width="100%"
          justifyContent="space-between"
          className={classes.root}
        >
          <Home
            className={classes.homeIcon}
            onClick={props.onHomeButtonClick}
          />
          <div
            className={classes.chatbox}
            onClick={() => console.log("Chat with an agent now!")}
          >
            <Chat className={classes.chatIcon} />
            CHAT
          </div>
        </Box>
      ) : undefined}

      <Box
        className={`${classes.titleBar} ${
          !props.showMenu && classes.homeTitleBar
        }`}
        pt={1}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
        <Box display="flex" flexDirection="row">
          {props.onLeftButtonClick ? (
            <IconButton
              edge="start"
              color="secondary"
              aria-label="menu"
              onClick={props.onLeftButtonClick}
            >
              <ArrowBack />
            </IconButton>
          ) : undefined}
          <Typography variant="h2">{props.title}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" className={classes.subtitle}>
            {props.subtitle}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

interface BottomButtonProps {
  processing?: boolean;
  onClick: () => void | Promise<void>;
  title: string;
  disabled?: boolean;
}

export const FixedBottomProminentButton: React.FunctionComponent<BottomButtonProps> = (
  props
) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.bottomContainer}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {props.processing || false ? (
        <CircularProgress />
      ) : (
        <Button
          className={classes.nextButton}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.title}
        </Button>
      )}
    </Box>
  );
};

export const FixedMiddleBodyWithVerticalScroll: React.FunctionComponent<{}> = (
  props
) => {
  const classes = useStyles();
  return (
    <Box className={classes.body} display="flex" flexDirection="column">
      {props.children}
    </Box>
  );
};

export const PageContainer: React.FunctionComponent<{}> = (props) => {
  return (
    <Box display="flex" flexDirection="column">
      {props.children}
    </Box>
  );
};
