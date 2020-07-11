const graphql = require("graphql");
const _ = require("lodash"); //array ve objeler üzerinde arama bulma gibi işlemler yapar.

const movies = [
  {
    id: "1",
    title: "God Father",
    description: "good movie",
    year: 1972,
    directorId: "1",
  },
  {
    id: "2",
    title: "Somewhere",
    description: "good movie",
    year: 2010,
    directorId: "1",
  },
  {
    id: "3",
    title: "Pulp Fiction",
    description: "good movie",
    year: 1994,
    directorId: "2",
  },
];

const directors = [
  {
    id: "1",
    name: "Francis Ford Coppola",
    birth: 1939,
  },
  {
    id: "2",
    name: "Quentin Tarantino",
    birth: 1963,
  },
];

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return _.find(directors, { id: parent.id }); //find ilk bulduğunu getirir filter ise tüm eşleşenleri array olarak getirir
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return _.filter(movies, { directorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(movies, { id: args.id });
      },
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(directors, { id: args.id });
      },
    },

    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      },
    },
  },
});

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
});
