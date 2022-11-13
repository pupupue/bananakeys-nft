import { settings } from "../projects/first-project/settings";
import { getAllAttributes } from "../getAllAttributes";
import {
  CollectionLog,
  DropTable,
  Feature,
  NFT,
} from "../projects/first-project/types";
import _ from "lodash";
import { jsonParser } from "./jsonParser";
const fs = require("fs");

type TraitsMap = Map<
  string,
  { rarity: DropTable; completed: boolean; entries: (NFT | null)[] }
>;

export const initCollectionLog = async () => {
  const attributes = await getAllAttributes();
  const collectionMap: CollectionLog = new Map();
  // populate collectionMap with collectionTraits
  Object.entries(attributes)
    .map(([attribute, value]) => {
      const collectionTraits = Object.entries(value);
      const traitsMap: TraitsMap = new Map();
      collectionTraits.forEach(([trait, value]) => {
        traitsMap.set(trait, {
          rarity: value.dropTable,
          completed: false,
          entries: initializeEntries(value.dropTable),
        });
      });
      collectionMap.set(
        attribute as typeof settings.attributes[number],
        traitsMap
      );
      return { [attribute]: collectionTraits };
    })
    .filter((e) => e);

  const stringified = await JSON.stringify(
    collectionMap,
    jsonParser.replacer,
    3
  );

  await fs.writeFile(
    "./src/nft-drop/db/collectionlog.json",
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
  // await writeJsonFile("../db/collectionlog.json", collctionMap);
  //     console.log("collectionArray:");
  // console.log(collectionArray);
  // const traitFrequency = await (await getAllAttributes()).filter((attribute) => {
  //   attribute.
  // });
  // console.log(rarityCap);
  // console.log(traitFrequency);
};

// Map of collectiable attributes
// "attribute": Map of traits { rarity: "", entries: array of fixed len <NFT | null>}

const initializeEntries = (rarity: DropTable) => {
  const rarityCap = { ...settings.rarityCap, common: 0 };
  const len = rarityCap[rarity];
  const initialArray = new Array(len).map((v) => null);
  return initialArray;
};
