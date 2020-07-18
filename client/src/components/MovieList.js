import React, { Component } from "react";
import { Query } from "react-apollo";
//import { graphql } from "react-apollo";  //bu eskiyöntem

//queries
import {getMoviesQuery} from "../queries/queries"

class MovieList extends Component {
  /* listMovies() {                             //props kullanacaksan bu yöntem kullanmıyacaksan aşağıdaki Query yöntemi
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      return data.movies.map((movie) => <li key={movie.id}>{movie.title}</li>);
    }
  } */
  render() {
    console.log(this.props);
    return (
      <div>
        <ul className="movie-list">
          <Query query={getMoviesQuery}>
            {({ loading, error, data }) => {
              if (loading) return <div>Loading...</div>;
              if (error) return <div>Error!</div>;
              else
                return data.movies.map((movie) => (
                  <li key={movie.id}>{movie.title}</li>
                ));
            }}
          </Query>
        </ul>
      </div>
    );
  }
}

export default MovieList;
