import _ from "lodash";
import { jsonParser } from "./jsonParser";
const fs = require("fs");

export const getJsonMap = async (src: string) => {
  const data = await fs.readFileSync(src, "utf8");
  const json = await JSON.parse(data, jsonParser.reviver);
  return json;
};
