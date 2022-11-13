import _ from "lodash";
import { DropTable, DropTableSettings } from "../projects/first-project/types";

export const createDropTable = (settings: Map<number, DropTable>) => {
  let highrolls: any[] = [];
  settings.delete(100);
  settings.forEach((val, key) => {
    highrolls.push({ [val]: key });
  });

  const sortedHighrolls = _.sortBy(highrolls, [
    function (o) {
      return Object.values(o)[0];
    },
  ]);
  const dropTable = sortedHighrolls.reduce(
    (a, v: number) => ({
      ...a,
      [settings.get(Object.values(v)[0]) as string]:
        (getLowest(a) === 0 ? 100 : getLowest(a)) - Object.values(v)[0],
    }),
    { common: 0 }
  );
  // sort in a way where first is largest
  const dropTableArray = _.reverse(
    _.sortBy(
      Object.entries(dropTable).map(([k, v]: any) => {
        return { [v]: k };
      }),
      [
        function (o) {
          const key = Object.keys(o)[0];
          return key;
        },
      ]
    )
  );

  return dropTableArray as { [key: number]: DropTable }[];
};

function getLowest(object: { [key: string]: number }): number {
  return _.min(Object.values(object).filter((v) => v > 0)) ?? 0;
}
