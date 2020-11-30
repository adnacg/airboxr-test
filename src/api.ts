import { SourceRaw, SourcesMap, TableRaw, TablesMap } from "./context";

// insert API token here
const TOKEN = "";
const DATA_URL = "https://api.airboxr.com/data/dataStores";

const processSources = (sources: SourceRaw[]): SourcesMap =>
  sources.reduce((sourcesAcc: SourcesMap, sourceRaw: SourceRaw) => {
    const processedTables = sourceRaw.tables.reduce(
      (tablesAcc: TablesMap, tableRaw: TableRaw) => {
        const titles = tableRaw.title.split("||");

        if (titles.length === 1) {
          tablesAcc[titles[0]] = { title: titles[0] };
          return tablesAcc;
        }

        if (titles.length === 2) {
          const newTable = { title: titles[1] };
          if (Object.keys(tablesAcc).includes(titles[0])) {
            tablesAcc[titles[0]].subTables = {
              ...tablesAcc[titles[0]].subTables,
              [titles[1]]: newTable,
            };
          } else {
            tablesAcc[titles[0]] = {
              title: titles[0],
              subTables: {
                [titles[1]]: newTable,
              },
            };
          }
          return tablesAcc;
        }

        console.error("Discarding invalid table.");
        return tablesAcc;
      },
      {}
    );

    sourcesAcc[sourceRaw.name] = {
      name: sourceRaw.name,
      tables: processedTables,
      favourite: false,
    };
    return sourcesAcc;
  }, {});

const handleErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(`Received status ${response.status} when fetching data`);
  }
  return response;
};

export const getSources = () =>
  fetch(DATA_URL, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  })
    .then(handleErrors)
    .then((res) => res.json())
    .then((data): SourcesMap => processSources(data))
    .catch((error) => {
      console.error(error);
      throw Error(error);
    });
