import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { GET_USER, DELETE_USER } from "../Query";
class show extends Component {
  render() {
    return (
      <Query
        query={GET_USER}
        variables={{ email: "kumarapypradeep@gmail.com" }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <div className="container">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4>User List</h4>

                  <h3 className="panel-title">{data.name}</h3>
                </div>
                <div className="panel-body">
                  <dl>
                    <dt>ID:</dt>
                    <dd>{data.id}</dd>
                    <dt>Author:</dt>
                    <dd>{data.name}</dd>
                    <dt>Email:</dt>
                    <dd>{data.email}</dd>
                  </dl>
                  <Mutation
                    mutation={DELETE_USER}
                    key={data.id}
                    onCompleted={() => this.props.history.push("/create")}
                  >
                    {(removeuser, { loading, error }) => (
                      <div>
                        <form
                          onSubmit={e => {
                            console.log(e, "EEE");
                            e.preventDefault();
                            removeuser({ variables: { id: data.id } });
                          }}
                        >
                          <Link
                            to={`/edit/${data.id}`}
                            className="btn btn-success"
                          >
                            Edit
                          </Link>
                          &nbsp;
                          <button type="submit" className="btn btn-danger">
                            Delete
                          </button>
                        </form>
                        {loading && <p>Loading...</p>}

                        {error && <p>Error :( Please try again</p>}
                      </div>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default show;
