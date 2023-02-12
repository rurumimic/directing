import * as dotenv from "dotenv";
dotenv.config();

import { OpenFgaApi } from "@openfga/sdk";

const fgaClient = new OpenFgaApi({
  apiScheme: process.env.FGA_API_SCHEME, // optional, defaults to "https"
  apiHost: process.env.FGA_API_HOST, // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
  storeId: process.env.FGA_STORE_ID,
});

const { allowed } = await fgaClient.check({
  authorization_model_id: "01GS2Y8QT2M6PM445QJMS8EBJF",
  tuple_key: {
    user: "user:anne",
    relation: "reader",
    object: "document:Z",
  },
});

console.log("allowed", allowed);
