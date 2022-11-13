import { createNFTMetadata } from "./functions/createNFTMetadata";
import { getJsonMap } from "./functions/getJsonMap";
import { NFT } from "./projects/first-project/types";
import { writeNFTToJson } from "./functions/writeNFTToJson";
import { updateCollectionLog } from "./functions/updateCollectionLog";
import { getCompleteness } from "./functions/getCompleteness";

export const mint = async () => {
  const NFT = await createNFTMetadata(await getNextId());
  // console.log(NFT);
  await writeNFTToJson(NFT);
  await updateCollectionLog(NFT);
  return NFT;
};

const getNextId = async (): Promise<string> => {
  const nfts: Map<string, NFT> = await getJsonMap(
    "./src/nft-drop/db/nfts.json"
  );
  const size = nfts.size;
  const nextId = `#${padLeft(size, 5)}`;
  return nextId;
};

function padLeft(num: number, pad: number, str: string = "0") {
  return Array(pad - String(num).length + 1).join(str) + num;
}
