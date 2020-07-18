import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
//import { graphql } from "react-apollo";  //bu eskiyöntem

//queries
import {
  getDirectorsQuery,
  newMovieMutation,
  getMoviesQuery,
} from "../queries/queries";

export default class NewMovieFrom extends Component {
  state = {
    title: "",
    description: "",
    year: null,
    directorId: "",
  };
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <Mutation
        mutation={newMovieMutation}
        onCompleted={() => {   // resetleme
          this.formRef.reset();
        }}
      >
        {(addMovie, { loading, error }) => (
          <div>
            <form
              ref={(el) => {     //  resetleme
                this.formRef = el;
              }}
              onSubmit={(e) => {
                e.preventDefault();

                addMovie({
                  variables: {
                    title: this.state.title,
                    description: this.state.description,
                    year: parseInt(this.state.year, 10), // 10 luk taban
                    directorId: this.state.directorId,
                  },
                  refetchQueries: [{ query: getMoviesQuery }],
                });
               
              }}
            >
              <div>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={this.onChange}
                  placeholder="Movie Title"
                ></input>
              </div>
              <div>
                <label>Description</label>
                <textarea
                  name="description"
                  onChange={this.onChange}
                  placeholder="Description"
                ></textarea>
              </div>
              <div>
                <label>Year</label>
                <input
                  type="text"
                  name="year"
                  onChange={this.onChange}
                  placeholder="Year"
                ></input>
              </div>
              <div>
                <label>Director</label>
                <select name="directorId" onChange={this.onChange}>
                  <option>Choose Director</option>
                  <Query query={getDirectorsQuery}>
                    {({ loading, error, data }) => {
                      if (loading)
                        return <option disabled={true}>Loading...</option>;
                      if (error) return <option disabled={true}>Error!</option>;
                      else
                        return data.directors.map((director) => (
                          <option key={director.id} value={director.id}>
                            {director.name}
                          </option>
                        ));
                    }}
                  </Query>
                </select>
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>Error!</div>}
          </div>
        )}
      </Mutation>
    );
  }
}
