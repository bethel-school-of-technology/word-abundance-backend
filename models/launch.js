let {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean} = require('graphql')
// let { buildSchema } = require('graphql');
let {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean} = require('graphql');

let LaunchType = new GraphQLObjectType({
  name: 'launch',
  fields: () => ({
    flight_number: {
      type: GraphQLInt
    },
    mission_name: {
      type: GraphQLString
    },
    flight_number: {
      type: GraphQLInt
    },
    flight_number: {
      type: GraphQLInt
    },
    flight_number: {
      type: GraphQLInt
    },
    flight_number: {
      type: GraphQLInt
    },

  })
})
