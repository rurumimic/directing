require("dotenv").config();

const fp = require("fastify-plugin");
const { OpenFgaApi } = require("@openfga/sdk"); // OR import { OpenFgaApi } from '@openfga/sdk';

module.exports = fp(async function (fastify, opts) {
  fastify.decorate("authorize", async function (request, reply) {
    console.log(request.user);
    try {
      // configure the openfga api client
      const fgaClient = new OpenFgaApi({
        apiScheme: process.env.FGA_API_SCHEME, // Optional. Can be "http" or "https". Defaults to "https"
        apiHost: process.env.FGA_API_HOST,
        storeId: process.env.FGA_STORE_ID,
      });
      const { allowed } = await fgaClient.check({
        tuple_key: {
          user: request.user.user,
          relation: request.user.relation,
          object: request.user.object,
        },
      });
      if (!allowed) {
        reply.code(401).send(`Not authenticated`);
      }
    } catch (err) {
      reply.send(err);
    }
  });
});
