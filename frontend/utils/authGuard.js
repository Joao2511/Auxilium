import { getJWT } from "./storage.js";
import { go } from "../routes/router.js";

export const authGuard = (loader) => async () => {
  if (!getJWT()) { go("/"); return; }
  await loader();
};
