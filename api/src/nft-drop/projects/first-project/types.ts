export type DropTable = "common" | "rare" | "epic" | "legendary";
export type Rarity = DropTable;
export enum DropTableEnum {
  "common" = "common",
  "rare" = "rare",
  "epic" = "epic",
  "legendary" = "legendary",
  "secret" = "secret",
}

export type DropTableSettings = {
  common: number;
  epic: number;
  legendary: number;
  secret: number;
};

export type Feature = {
  dropTable: DropTable;
};

export type Trait = {
  trait_type: "animal" | "expression" | "forehead" | "hands" | "trinket";
  value: string;
  rarity: Rarity;
};

export type NFT = {
  id: string;
  timestamp: string;
  traits: Trait[];
};

export type CollectionLog = Map<
  "animal" | "expression" | "forehead" | "hands" | "trinket",
  Map<
    string,
    {
      rarity: DropTable;
      completed: boolean;
      entries: (NFT["id"] | null)[];
    }
  >
>;
