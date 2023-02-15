const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  fastify.decorate("preauthorize", async function (request, reply) {
    try {
      switch (request.method) {
        case "GET":
          request.relation = "reader";
          break;
        case "POST":
          request.relation = "writer";
          break;
        case "DELETE":
        default:
          request.relation = "owner";
          break;
      }
      request.object = `document:${request.params.document}`;
    } catch (err) {
      reply.send(err);
    }
  });
});
