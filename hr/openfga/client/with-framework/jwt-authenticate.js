const fp = require("fastify-plugin");

module.exports = fp(async function (fastify, opts) {
  /*
  fastify.register(require("fastify-jwt"), {
    secret: {
      private: readFileSync(`${path.join(__dirname, "certs")}/private.key`, "utf8"),
      public: readFileSync(`${path.join(__dirname, "certs")}/public.key`, "utf8"),
    },
    sign: { algorithm: "RS256" },
  });
  */

  fastify.register(require("fastify-jwt"), {
    secret: "supersecret",
  });

  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });
});
