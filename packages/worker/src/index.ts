import "dotenv/config";
import { remote } from "./remote";

export { remote };

export const worker = async () => {
  console.log(["worker"]);

  remote();
};
