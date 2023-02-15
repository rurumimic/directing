// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });
const jwt_authenticate = require("./jwt-authenticate");
const preauthorize = require("./preauthorize");
const authorize = require("./authorize");
const routeread = require("./route-read");

fastify.register(jwt_authenticate);
fastify.register(preauthorize);
fastify.register(authorize);
fastify.register(routeread);

// Run the server
const start = async () => {
  try {
    await fastify.listen({ port: 8888, host: "0.0.0.0" });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
