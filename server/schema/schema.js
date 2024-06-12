const graphql = require('graphql')

var _ = require('lodash');

// dummy data
var userData = [
    {id: '1', name: 'Bond', age: 36},
    {id: '2', name: 'Jack', age: 30},
    {id: '3', name: 'Kiki', age: 3},
    {id: '4', name: 'Mardi', age: 50},
    {id: '5', name: 'John', age: 55}
]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

// create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })
})

// RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: {
                id: {
                    type: GraphQLString
                }
            },
            resolve(parent, args) {
                // we resolve the data
                // get and return data from a datasource
                return _.find(userData, {
                        id: args.id
                    }
                )
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
