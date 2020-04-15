const buildSchema = require('graphql').buildSchema;

const schema = `
    type Query {
        messages: [String]
    }

    type Mutation {
        sendMessage(username: String!, message: String!): Boolean
    }
`;

module.exports = buildSchema(schema);
