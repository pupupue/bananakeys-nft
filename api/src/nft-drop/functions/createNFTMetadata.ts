import { DropTable, NFT, Trait } from "../projects/first-project/types";
import { settings } from "../projects/first-project/settings";
import { rollRarity } from "./rollRarity";

export const createNFTMetadata = async (id: string) => {
  let NFT: NFT = {
    id: id,
    timestamp: `time${Math.random()}`,
    traits: [],
  };
  const promises = settings.attributes.map(async (attribute) => {
    const rarity = await rollRarity(attribute);
    const value = await pickFeatureByAttribute({ attribute, rarity });
    const trait = {
      trait_type: attribute,
      rarity: rarity,
      value: value,
    };
    return trait;
  });
  const attributes = await Promise.all(promises);
  NFT.traits = attributes;
  return NFT;
};

interface PickFeatureByAttribute {
  rarity: DropTable;
  attribute: typeof settings.attributes[number];
}
const pickFeatureByAttribute = async ({
  rarity,
  attribute,
}: PickFeatureByAttribute) => {
  const attributeSettings = await import(
    `../projects/first-project/${attribute}/index.ts`
  );

  const featureList = Object.entries(attributeSettings[attribute])
    .filter(([__, value]: any) => {
      return value.dropTable === rarity;
    })
    .map(([feature, __]: any) => feature);

  const winner = featureList[Math.floor(Math.random() * featureList.length)];
  return winner;
};
