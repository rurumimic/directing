import * as dotenv from "dotenv";
dotenv.config();

import { OpenFgaApi } from "@openfga/sdk";

const fgaClient = new OpenFgaApi({
  apiScheme: process.env.FGA_API_SCHEME, // optional, defaults to "https"
  apiHost: process.env.FGA_API_HOST, // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
  storeId: process.env.FGA_STORE_ID,
});

const { allowed } = await fgaClient.check({
  authorization_model_id: "01GSMNE0TJAGF9GQYV91W6B9G5",
  tuple_key: {
    user: "user:bob",
    relation: "reader",
    object: "document:meeting_notes.doc",
  },
});

console.log("allowed", allowed);
