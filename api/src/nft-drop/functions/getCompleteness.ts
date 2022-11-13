import _ from "lodash";
import { CollectionLog, NFT } from "../projects/first-project/types";
import { getJsonMap } from "./getJsonMap";

export const getCompleteness = async () => {
  const collectionLog: CollectionLog = await getJsonMap(
    "./src/nft-drop/db/collectionlog.json"
  );
  const nfts: Map<string, NFT> = await getJsonMap(
    "./src/nft-drop/db/nfts.json"
  );
  collectionLog.forEach((traits, attriubte) => {
    console.log(attriubte, ": ");
    let completed = 0;
    let available = 0;

    traits.forEach((value, trait) => {
      if (value.rarity !== "common") {
        const [ids, nulls] = _.partition(value.entries, function (v) {
          return !!v;
        }) as [string[], null[]];
        completed += ids.length;
        available += nulls.length;
        console.log(trait, ids.length, nulls.length);
      }
    });

    console.log(
      `current completeness is ${completed} / ${completed + available}`
    );

    const size = nfts.size;
    console.log(`current collection size is: ${size}`);
  });
};
