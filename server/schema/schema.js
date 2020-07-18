const graphql = require("graphql");
const _ = require("lodash"); //array ve objeler üzerinde arama bulma gibi işlemler yapar.
// Mongodb Models
const Movie = require("../models/Movie");
const Director = require("../models/Director");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull   // movie veya director eklerken boş olmasını istemediğimiz alanları GraphQLNonNull ile tanımlarız
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLString  },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    year: { type: GraphQLInt },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        //return _.find(directors, { id: parent.id }); //find ilk bulduğunu getirir filter ise tüm eşleşenleri array olarak getirir
         return Director.findById(parent.directorId); //findById ilk bulduğunu getirir
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLString  },
    name: { type: GraphQLString },
    birth: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
       // return _.filter(movies, { directorId: parent.id });
        return Movie.find({directorId:parent.id}); // find hepsini getirir
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLString  } },
      resolve(parent, args) {
        //return _.find(movies, { id: args.id });
        return Movie.findById(args.id);
      },
    },

    director: {
      type: DirectorType,
      args: { id: { type: GraphQLString  } },
      resolve(parent, args) {
       // return _.find(directors, { id: args.id });
       return Director.findById(args.id);  //
      },
    },
    
    // GET movies
    movies: {   
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
       // return movies;
       return Movie.find({}); // hepsini getir
      },
    },
    //GET directors
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
       // return directors;
       return Director.find({}); // hepsini getir
      },
    },
  },
});


const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:{
    addMovie:{
      type:MovieType,
      args:{
        title:{type:new GraphQLNonNull(GraphQLString)},
        description:{type:GraphQLString},
        year:{type:new GraphQLNonNull(GraphQLInt)},
        directorId:{type:new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent,args){
        const movie = new Movie({
          title: args.title,
          description: args.description,
          year:args.year,
          directorId: args.directorId

        })
        return movie.save();
      }
      
    },
    addDirector:{
      type:DirectorType,
      args:{
        name:{type:new GraphQLNonNull(GraphQLString)},
        birth:{type:GraphQLInt},
      },
      resolve(parent,args){
        const director = new Director({
          name: args.name,
          birth:args.birth,
        })
        return director.save();
      }
      
    }
  }
})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});



/* const movies = [
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
 */