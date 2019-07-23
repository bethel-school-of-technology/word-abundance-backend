const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLBoolean} = require('graphql');

const LaunchType = new GraphQLObjectType({
  name: 'launch',
  fields: () => ({
    flight_number: {
      type: GraphQLInt
    },
    mission_name: {
      type: GraphQLString
    },
    launch_year: {
      type: GraphQLInt
    },
    launch_date_localc: {
      type: GraphQLInt
    },
    launch_success: {
      type: GraphQLInt
    },
    rocket: {
      type: RocketType
    },

  })
})
