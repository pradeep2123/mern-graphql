import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
import "../../App.css";
import Validation from "../../../../validation";
import { GET_USER, ADD_USER, DELETE_USER, USER_SIGNIN } from "../../Query";
import Signup from "../Signup/Create";

class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      email_err: "",
      password_err: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    console.log(e, "SIGNIN");
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    console.log(e, "ONSUBMIT ---");
  }
  render() {
    const styles = {
      inputContainer: {
        width: "30%"
      }
    };
    return (
      <div className="container" style={styles.inputContainer}>
        <h1 className="h1 mb-3 font-weight-normal">Create Form</h1>
        <Form onSubmit={this.onSubmitForm}>
          <FormGroup>
            <Label for="name">Email</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={this.onChange}
              onBlur={e => {
                this.onblur(e);
              }}
              value={this.state.email === null ? "" : this.state.email}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Password</Label>
            <Input
              type="text"
              name="name"
              id="password"
              onChange={this.onChange}
              onBlur={e => {
                this.onblur(e);
              }}
              value={this.state.password === null ? "" : this.state.password}
              required
            />
          </FormGroup>
          <Button
            disabled={
              this.state.emailError === false &&
              this.state.passwordError === false
            }
            className="btn btn-success"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default signin;
