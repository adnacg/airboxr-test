import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  makeStyles,
} from "@material-ui/core";
import {
  PageContainer,
  FixedTopBar,
  FixedMiddleBodyWithVerticalScroll,
  FixedBottomProminentButton,
  onLeftButtonClickFactory,
  onHomeButtonClickFactory,
} from "../components/Layout";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { appContext, TablesMap } from "../context";
import { SUBTITLES, TITLES } from "../constants";

const useStyles = makeStyles({
  root: {},
  selection: {
    borderBottom: "1px solid #CDCDCD",
    marginLeft: "inherit",
    marginRight: "inherit",
    flex: "flex-start",
  },
});

export const SelectTable: React.FunctionComponent = () => {
  const { sources } = useContext(appContext);
  const { source: sourceName } = useParams<{ source: string }>();
  const { search } = useLocation();
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [filterQuery, setFilterQuery] = useState<string>("");

  const history = useHistory();
  const classes = useStyles();

  const tableName = new URLSearchParams(search).get("tableName");

  useEffect(() => {
    setSelectedTable("");
  }, [tableName]);

  let tables: TablesMap;
  if (!Object.keys(sources).length || !sourceName) {
    tables = {};
  } else if (tableName) {
    tables = sources[sourceName].tables[tableName].subTables || {};
  } else {
    tables = sources[sourceName].tables;
  }

  return (
    <PageContainer>
      <FixedTopBar
        title={TITLES.selectTable}
        onLeftButtonClick={onLeftButtonClickFactory(history)}
        subtitle={sourceName + SUBTITLES.selectTable}
        showMenu={true}
        onHomeButtonClick={onHomeButtonClickFactory(history)}
      />
      <FixedMiddleBodyWithVerticalScroll>
        <Box display="flex" flexDirection="column">
          <TextField
            id="filter"
            value={filterQuery}
            placeholder="Filter"
            onChange={(event) => setFilterQuery(event.target.value)}
          />

          <FormControl component="fieldset">
            <RadioGroup
              aria-label="titles"
              name="titles"
              value={selectedTable}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSelectedTable(e.target.value)
              }
            >
              {Object.keys(tables)
                .filter(
                  (title) =>
                    !filterQuery || title.match(new RegExp(filterQuery, "gi"))
                )
                .map((title) => (
                  <FormControlLabel
                    key={title}
                    value={title}
                    control={<Radio />}
                    label={title}
                    className={classes.selection}
                  />
                ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </FixedMiddleBodyWithVerticalScroll>
      <FixedBottomProminentButton
        title="NEXT"
        disabled={!selectedTable}
        onClick={() => {
          tables[selectedTable].subTables
            ? history.push(`/sources/${sourceName}?tableName=${selectedTable}`)
            : console.log("TODO - Go to SelectColumnsPage");
        }}
      />
    </PageContainer>
  );
};
