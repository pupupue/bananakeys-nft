import _ from "lodash";
import { settings } from "../projects/first-project/settings";
import { CollectionLog, DropTable, NFT } from "../projects/first-project/types";
import { getJsonMap } from "./getJsonMap";
import { jsonParser } from "./jsonParser";
const fs = require("fs");

export const updateCollectionLog = async (nft: NFT) => {
  const collectionLog: CollectionLog = await getJsonMap(
    "./src/nft-drop/db/collectionlog.json"
  );
  // console.log(collectionLog);
  nft.traits.forEach((trait) => {
    const collectionTrait = collectionLog
      .get(trait.trait_type)
      ?.get(trait.value)!;

    //throw error here
    collectionLog.get(trait.trait_type)?.set(trait.value, {
      ...collectionTrait,
      entries:
        trait.rarity === "common"
          ? [...collectionTrait.entries, nft.id]
          : updateEntries(nft.id, collectionTrait.entries),
      completed: updateCompleted(trait.rarity, collectionTrait.entries),
    });
  });

  const stringified = await JSON.stringify(
    collectionLog,
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
};

const updateEntries = (newId: NFT["id"], prevEntries: (NFT["id"] | null)[]) => {
  const [prevData, nulls]: any[] = _.partition(prevEntries, function (v) {
    return !!v;
  });
  return [...prevData, newId, ..._.drop(nulls)];
};

const updateCompleted = (
  rarity: DropTable,
  prevEntries: (NFT["id"] | null)[]
) => {
  if (rarity === "common") return false;
  const cap = settings.rarityCap[rarity];
  const filledLength = prevEntries.filter((v) => v).length;
  return cap === filledLength + 1; // + one because same cycle we update
};
