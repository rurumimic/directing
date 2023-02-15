module.exports = async function (fastify, opts) {
  fastify.get(
    "/read/:document",
    {
      preValidation: [fastify.authenticate, fastify.preauthorize, fastify.authorize],
    },
    async function (request, reply) {
      // the user's id is in request.user
      return { read: request.params.document };
    }
  );
};
