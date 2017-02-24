const graphql = require('graphql');
//const _ = require('lodash');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLSchema
} = graphql;

// const users = [
//     { id: '23', firstName: 'Bill', age: 23 },
//     { id: '47', firstName: 'Jack', age: 20 }
// ];

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(resp => resp.data);
                //return _.find(users, { id: args.id });
                //return users.filter(user => user.id === args.id)[0];
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});