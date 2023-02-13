import * as dotenv from "dotenv";
dotenv.config();

import { OpenFgaApi } from "@openfga/sdk";

const openFga = new OpenFgaApi({
  apiScheme: process.env.FGA_API_SCHEME, // optional, defaults to "https"
  apiHost: process.env.FGA_API_HOST, // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
});

const { id: storeId } = await openFga.createStore({
  name: "FGA Demo Store",
});

console.log("storeId", storeId);
