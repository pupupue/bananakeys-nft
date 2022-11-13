import _ from "lodash";
import { NFT } from "../projects/first-project/types";
import { getJsonMap } from "./getJsonMap";
import { jsonParser } from "./jsonParser";
const fs = require("fs");

export const writeNFTToJson = async (nft: NFT) => {
  const json: Map<string, NFT> = await getJsonMap(
    "./src/nft-drop/db/nfts.json"
  );
  const updatedJson = json.set(nft.id, nft);

  const stringified = await JSON.stringify(updatedJson, jsonParser.replacer, 3);

  await fs.writeFile(
    "./src/nft-drop/db/nfts.json",
    stringified,
    "utf8",
    (err: any) => {
      if (err) {
        console.log(`Error writing file: ${err}`);
      } else {
        console.log(`File is written successfully!`);
      }
    }
  );
};
