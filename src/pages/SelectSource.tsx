import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Favorite, FavoriteBorder, Error } from "@material-ui/icons";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import {
  PageContainer,
  FixedTopBar,
  FixedMiddleBodyWithVerticalScroll,
  onLeftButtonClickFactory,
  onHomeButtonClickFactory,
} from "../components/Layout";
import { appContext } from "../context";
import { getSources } from "../api";
import { SUBTITLES, TITLES } from "../constants";
import mailchimp from "../assets/mailchimp-logo.png";
import facebook from "../assets/fb-ads-logo.png";
import google from "../assets/google-ads-logo.png";
import analytics from "../assets/google-logo.png";

const useStyles = makeStyles({
  root: { width: "50%" },
  sourceCard: {
    height: "inherit",
    padding: "0.2rem",
    boxSizing: "border-box",
    margin: "0.5rem",
  },
  sourceIcon: { paddingTop: "0.5rem" },
  favIconContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-1rem",
  },
  favIcon: { height: "1rem", width: "1rem" },
});

const getLogo = (sourceName: string): string => {
  if (sourceName === "Google Analytics") {
    return analytics;
  } else if (sourceName === "Facebook Ads") {
    return facebook;
  } else if (sourceName === "Google Ads") {
    return google;
  } else if (sourceName === "Mailchimp") {
    return mailchimp;
  } else {
    return mailchimp;
  }
};

export const SelectSource: React.FunctionComponent = () => {
  const { sources, setSources } = useContext(appContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    getSources()
      .then((data) => {
        setSources(data || {});
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setSources({});
        setLoading(false);
        setError(true);
      });
  }, [setSources]);

  return (
    <PageContainer>
      <FixedTopBar
        title={TITLES.selectSource}
        onLeftButtonClick={onLeftButtonClickFactory(history)}
        subtitle={SUBTITLES.selectSource}
        showMenu={true}
        onHomeButtonClick={onHomeButtonClickFactory(history)}
      />
      <FixedMiddleBodyWithVerticalScroll>
        <Box
          display="flex"
          flexDirection="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="center"
          width="100%"
        >
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <>
              <Error color="primary" />
              <Typography variant="h2" color="primary">
                Error fetching data, please try again later.
              </Typography>
            </>
          ) : (
            <>
              {Object.keys(sources)
                .sort((sourceName1, sourceName2) => {
                  if (
                    sources[sourceName1].favourite &&
                    !sources[sourceName2].favourite
                  )
                    return -1;
                  else if (
                    !sources[sourceName1].favourite &&
                    sources[sourceName2].favourite
                  )
                    return 1;
                  else return 0;
                })
                .map((sourceName) => (
                  <div key={sourceName} className={classes.root}>
                    <Card className={classes.sourceCard}>
                      <Typography variant="subtitle2">
                        {sourceName.toUpperCase()}
                      </Typography>
                      <IconButton
                        className={classes.sourceIcon}
                        onClick={() => history.push(`/sources/${sourceName}`)}
                      >
                        <img
                          src={getLogo(sourceName)}
                          alt={sourceName}
                          height={40}
                          width={40}
                        />
                      </IconButton>
                      <span className={classes.favIconContainer}>
                        {sources[sourceName].favourite ? (
                          <Favorite
                            className={classes.favIcon}
                            onClick={() =>
                              setSources({
                                ...sources,
                                [sourceName]: {
                                  ...sources[sourceName],
                                  favourite: false,
                                },
                              })
                            }
                          />
                        ) : (
                          <FavoriteBorder
                            className={classes.favIcon}
                            onClick={() =>
                              setSources({
                                ...sources,
                                [sourceName]: {
                                  ...sources[sourceName],
                                  favourite: true,
                                },
                              })
                            }
                          />
                        )}
                      </span>
                    </Card>
                  </div>
                ))}
            </>
          )}
        </Box>
      </FixedMiddleBodyWithVerticalScroll>
    </PageContainer>
  );
};
