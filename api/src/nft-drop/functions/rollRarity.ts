import {
  CollectionLog,
  DropTable,
  DropTableSettings,
} from "../projects/first-project/types";
import { createDropTable } from "./createDropTable";
import { settings } from "../projects/first-project/settings";
import _, { forEach } from "lodash";
import { getJsonMap } from "./getJsonMap";

export const rollRarity = async (
  attribute: typeof settings.attributes[number]
): Promise<DropTable> => {
  // from existing attriubtes get available attributes
  const availableAttributes: CollectionLog = await getJsonMap(
    "./src/nft-drop/db/collectionlog.json"
  );
  const attributeLog = availableAttributes.get(attribute);
  const dropTableMap = new Map<number, DropTable>();

  attributeLog?.forEach(({ completed, rarity }, key) => {
    if (!completed) {
      // attributeLog.delete(key);
      dropTableMap.set(settings.dropRates[rarity], rarity);
    }
  });

  const table = createDropTable(dropTableMap);
  const roll = Math.random() * 100;

  const res = table.find((entry) => {
    const [dropRate, dropRarity] = Object.entries(entry)[0];
    if (roll >= Number(dropRate)) {
      return true;
    } else {
      false;
    }
  });

  const winner = Object.values(res!)[0];
  return winner;
};
