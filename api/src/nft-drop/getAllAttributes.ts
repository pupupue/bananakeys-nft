import { settings } from "./projects/first-project/settings";
import { DropTable, Feature } from "./projects/first-project/types";

export const getAllAttributes = async () => {
  const promises = settings.attributes.map(async (attribute) => {
    const attributeSettings = await import(
      `./projects/first-project/${attribute}/index.ts`
    );
    return attributeSettings;
  });

  const fullAttributeList = await Promise.all(promises);

  const attributeObject: Record<
    typeof settings.attributes[number],
    Record<string, Feature>
  > = fullAttributeList.reduce(
    (a, attribute: Record<string, Record<string, Feature>>) => ({
      ...a,
      [Object.keys(attribute)[0]]: attribute[Object.keys(attribute)[0]],
    }),
    {}
  );
  return attributeObject;
};
