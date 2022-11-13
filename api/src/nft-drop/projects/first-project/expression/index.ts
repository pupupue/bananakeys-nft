import { DropTableEnum } from "../types";

export const expression = {
  innocent: {
    dropTable: DropTableEnum.common,
  },
  upset: {
    dropTable: DropTableEnum.rare,
  },
  malevolent: {
    dropTable: DropTableEnum.rare,
  },
  good: {
    dropTable: DropTableEnum.epic,
  },
  evil: {
    dropTable: DropTableEnum.epic,
  },
  possessed: {
    dropTable: DropTableEnum.legendary,
  },
};
