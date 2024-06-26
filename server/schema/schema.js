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
    {id: '1', title: 'swimming', description: 'swimming in the ocean', userId: '1'},
    {id: '2', title: 'baking', description: 'baking breads, cookies, and more', userId: '1'},
    {id: '3', title: 'coding', description: 'coding for fun', userId: '1'},
    {id: '4', title: 'sleeping', description: 'sleeping all day', userId: '4'},
    {id: '5', title: 'eating', description: 'eating all the good food', userId: '2'}
]

var postsData = [
    {id: '1', comment: 'Yea', userId: '1'},
    {id: '2', comment: 'Good', userId: '1'},
    {id: '3', comment: 'Amazing', userId: '1'},
    {id: '4', comment: 'Handsome', userId: '2'},
    {id: '5', comment: 'Pretty', userId: '4'}
]

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList
} = graphql

// create types
const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user...',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        profession: {type: GraphQLString},
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return _.filter(postsData, {
                    userId: parent.id
                });
            }
        },
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return _.filter(hobbiesData, {
                    userId: parent.id
                });
            }
        }
    })
})

const HobbyType = new GraphQLObjectType({
    name: 'Hobby',
    description: 'Documentation for hobby...',
    fields: () => ({
        id: {type: GraphQLID},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {
                    id: parent.userId
                })
            }
        }
    })
})

// post type (id, comment)
const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'Documentation for post...',
    fields: () => ({
        id: {type: GraphQLID},
        comment: {type: GraphQLString},
        user: {
            type: UserType,
            resolve(parent, args) {
                return _.find(userData, {
                    id: parent.userId
                })
            }
        }
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
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData;
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
        hobbies: {
            type: new GraphQLList(HobbyType),
            resolve(parent, args) {
                return hobbiesData;
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
        },
        posts: {
            type: new GraphQLList(PostType),
            resolve(parent, args) {
                return postsData;
            }
        }
    }
});

// mutations
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: {
            type: UserType,
            args: {
                // id: {type: GraphQLID}, 
                name: {type: GraphQLString},
                age: {type: GraphQLInt}, 
                profession: {type: GraphQLString}
            },
            resolve(parent, args) {
                let user = {
                    name: args.name,
                    age: args.age,
                    profession: args.profession
                }
                return user;
            }
        },
        createPost: {
            type: PostType,
            args: {
                // id: {type: GraphQLID},
                comment: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let post = {
                    comment: args.comment,
                    userId: args.userId
                }
                return post;
            }
        },
        createHobby: {
            type: HobbyType,
            args: {
                // id: {type: GraphQLID},
                title: {type: GraphQLString},
                description: {type: GraphQLString},
                userId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let hobby = {
                    title: args.title,
                    description: args.description,
                    userId: args.userId
                }
                return hobby;
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
