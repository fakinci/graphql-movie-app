import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//component
import MovieList from "./components/MovieList";
import NewMovieFrom from "./components/NewMovieFrom";

const client = new ApolloClient({ uri: "http://localhost:5000/graphql" });

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <MovieList />
        <NewMovieFrom/>
      </div>
    </ApolloProvider>
  );
}

export default App;
