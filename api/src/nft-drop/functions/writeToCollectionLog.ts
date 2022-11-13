import { settings } from "../projects/first-project/settings";
import { getAllAttributes } from "../getAllAttributes";
import { DropTable, Feature, NFT } from "../projects/first-project/types";
import _ from "lodash";
import { jsonParser } from "./jsonParser";
import { getJsonMap } from "./getJsonMap";
const fs = require("fs");

export const writeToCollectionLog = async (NFTS: NFT[]) => {
  const collectionLog = await getCollectionLog();
};

const getCollectionLog = async () => {
  const collectionLog = await getJsonMap(
    "./src/nft-drop/db/collectionlog.json"
  );
  return collectionLog;
};
