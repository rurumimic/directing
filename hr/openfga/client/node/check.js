import * as dotenv from "dotenv";
dotenv.config();

import { OpenFgaApi } from "@openfga/sdk";

const fgaClient = new OpenFgaApi({
  apiScheme: process.env.FGA_API_SCHEME, // optional, defaults to "https"
  apiHost: process.env.FGA_API_HOST, // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
  storeId: process.env.FGA_STORE_ID,
});

const { allowed } = await fgaClient.check({
  authorization_model_id: "01GSAH1WFQAWRXYP2PR9YHJ3K0",
  tuple_key: {
    user: "user:anne",
    relation: "reader",
    object: "document:Z",
  },
});

console.log("allowed", allowed);
