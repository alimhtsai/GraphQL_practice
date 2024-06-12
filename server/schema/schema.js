const graphql = require('graphql')

var _ = require('lodash');

// dummy data
var userData = [
    {id: '1', name: 'Bond', age: 36, profession: 'teacher'},
    {id: '2', name: 'Jack', age: 30, profession: 'software engineer'},
    {id: '3', name: 'Kiki', age: 3, profession: 'baby'},
    {id: '4', name: 'Mardi', age: 50, profession: 'manager'},
    {id: '5', name: 'John', age: 55, profession: 'IT manager'}
]

var hobbiesData = [
    {id: '1', title: 'swimming', description: 'swimming in the ocean'},
    {id: '2', title: 'baking', description: 'baking breads, cookies, and more'},
    {id: '3', title: 'coding', description: 'coding for fun'},
    {id: '4', title: 'sleeping', description: 'sleeping all day'},
    {id: '5', title: 'eating', description: 'eating all the good food'}
]

var postsData = [
    {id: '1', comment: 'Yea'},
    {id: '2', comment: 'Good'},
    {id: '3', comment: 'Amazing'},
    {id: '4', comment: 'Handsome'},
    {id: '5', comment: 'Pretty'}
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
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString}
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for hobby...',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString}
    })
})

// post type (id, comment)
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Documentation for post...',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString}
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
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // we resolve the data
                // get and return data from a datasource
                return _.find(userData, {
                    id: args.id
                });
            }
        },
        hobby: {
            type: HobbyType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return data for hobby
                return _.find(hobbiesData, {
                    id: args.id
                });
            }
        },
        post: {
            type: PostType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            resolve(parent, args) {
                // return data for hobby
                return _.find(postsData, {
                    id: args.id
                });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})
