import { api } from "encore.dev/api";

import { ApolloServer, HeaderMap } from "@apollo/server";
import { readFileSync } from "node:fs";
import { json } from "node:stream/consumers";

import resolvers from "./resolvers";

const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

await server.start();

export const graphqlAPI = api.raw(
  { expose: true, path: "/graphql", method: "*" },
  async (request, response) => {
    server.assertStarted("/graphql");

    const headers = new HeaderMap();

    for (const [key, value] of Object.entries(request.headers)) {
      if (value !== undefined) {
        headers.set(key, Array.isArray(value) ? value.join(", ") : value);
      }
    }

    const httpGraphQLResponse = await server.executeHTTPGraphQLRequest({
      httpGraphQLRequest: {
        headers,
        method: request.method!.toUpperCase(),
        body: await json(request),
        search: new URLSearchParams(request.url ?? "").toString(),
      },
      context: async () => {
        return { request, response };
      },
    });

    for (const [key, value] of httpGraphQLResponse.headers) {
      response.setHeader(key, value);
    }

    response.statusCode = httpGraphQLResponse.status || 200;

    if (httpGraphQLResponse.body.kind === "complete") {
      response.end(httpGraphQLResponse.body.string);

      return;
    }

    for await (const chunk of httpGraphQLResponse.body.asyncIterator) {
      response.write(chunk);
    }

    response.end();
  }
);
