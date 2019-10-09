import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "../App.css";
// import { Link } from "react-router-dom";

const Add_User = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
    }
  }
`;

class Create extends Component {
  render() {
    const styles = {
      inputContainer: {
        width: "30%"
      }
    };
    let name, email, password;
    return (
      <Mutation
        mutation={Add_User}
        onCompleted={() => this.props.history.push("/")}
      >
        {(addUser, { loading, error }) => {
          return (
            <div className="container" style={styles.inputContainer}>
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">Create User</h3>
                </div>
                <div className="panel-body">
                  <form
                    onSubmit={e => {
                      console.log(e, "EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
                      e.preventDefault();
                      debugger;
                      addUser({
                        variables: {
                          name: name.value,
                          email: email.value,
                          password: password.value
                        }
                      });
                      name.value = "";
                      email.value = "";
                      password.value = "";
                    }}
                  >
                    <div className="form-group">
                      <label htmlFor="name">NAME:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        ref={node => {
                          console.log(node, "-----------NODE--------");
                          name = node;
                        }}
                        placeholder="NAME"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">EMAIL:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        ref={node => {
                          console.log(node.value, "------");
                          var test_email =
                            "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
                          if (node.value.match(test_email)) {
                            email = node;
                          } else {
                            alert("Enter correct email address");
                          }
                        }}
                        placeholder="EMAIL"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">PASSWORD:</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        ref={node => {
                          password = node;
                        }}
                        placeholder="PASSWORD"
                      />
                    </div>
                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </form>
                  {loading && <p className="text-success">Loading...</p>}
                  {/* {error && (
                    <p className="text-danger">Error :( Please try again</p>
                  )} */}
                </div>
              </div>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default Create;
