import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';
import {faker} from '@faker-js/faker/locale/zh_CN'

const typeDefs = `#graphql
type UserType {
  name: String!
  desc: String!
  id: String!

  """账号信息"""
  account: String!
}

type Query {
  """使用ID查询用户"""
  find(id: String!): UserType!
}

type Mutation {
  create(params: UserInput!): Boolean!

  """更新用户"""
  update(id: String!, params: UserInput!): Boolean!

  """删除用户"""
  del(id: String!): Boolean!
}

input UserInput {
  name: String!
  desc: String!
  id: String!
  account: String
}
`;

const resolvers = {
    UserType: {
        name: () => faker.name.lastName + faker.name.fullName()
    }
};

// highlight-start
const mocks = {
  Int: () => 6,
  Float: () => 22.1,
  String: () => "hello",
};
// highlight-end

const server = new ApolloServer({
  schema: addMocksToSchema({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
      preserveResolvers: true,
      mocks, // highlight-line
  }),
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);