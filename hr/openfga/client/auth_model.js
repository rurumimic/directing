import * as dotenv from "dotenv";
dotenv.config();

import { OpenFgaApi } from "@openfga/sdk";

const fgaClient = new OpenFgaApi({
  apiScheme: process.env.FGA_API_SCHEME, // optional, defaults to "https"
  apiHost: process.env.FGA_API_HOST, // required, define without the scheme (e.g. api.openfga.example instead of https://api.openfga.example)
  storeId: process.env.FGA_STORE_ID,
});

const { authorization_model_id: id } = await fgaClient.writeAuthorizationModel({
  schema_version: "1.1",
  type_definitions: [
    {
      type: "user",
    },
    {
      type: "document",
      relations: {
        reader: {
          this: {},
        },
        writer: {
          this: {},
        },
        owner: {
          this: {},
        },
      },
      metadata: {
        relations: {
          reader: {
            directly_related_user_types: [
              {
                type: "user",
              },
            ],
          },
          writer: {
            directly_related_user_types: [
              {
                type: "user",
              },
            ],
          },
          owner: {
            directly_related_user_types: [
              {
                type: "user",
              },
            ],
          },
        },
      },
    },
  ],
});

console.log("authorization_model_id", id);
