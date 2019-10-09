import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

import "../App.css";
import Validation from "../validation";
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
  constructor(props) {
    super(props);
    this.state = {
      error: {}
    };
    console.log(JSON.stringify(this.props));
  }
  onblur = e => {
    let { error } = this.state;
    console.log(e.target, "EEE");
    if (e.target.name == "email") {
      if (e.target.value) {
        let test = Validation.validate_email(e.target.value);
        error["email"] = !test;
        this.setState({
          error
        });
      }
    }

    if (e.target.name == "password") {
      if (e.target.value) {
        let test = Validation.validate_password(e.target.value);
        error["password"] = !test;
        this.setState({
          error
        });
      }
    }
  };

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
        onCompleted={e => {
          alert(e, "eepep");
          this.props.history.push("/show");
        }}
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
                          name = node;
                        }}
                        placeholder="NAME"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">EMAIL:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        ref={node => {
                          email = node;
                        }}
                        onBlur={e => {
                          this.onblur(e);
                        }}
                        placeholder="EMAIL"
                        required
                      />

                      {this.state.error.email && (
                        <p className="text-danger">enter valid email</p>
                      )}
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
                        onBlur={e => {
                          this.onblur(e);
                        }}
                        placeholder="PASSWORD"
                        required
                      />
                    </div>
                    {this.state.error.password && (
                      <p className="text-danger">
                        Password should contains 1Upper 1lower 1number 1 special
                      </p>
                    )}

                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </form>
                  {loading && <p className="text-success">Loading...</p>}
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
