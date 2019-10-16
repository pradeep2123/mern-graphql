import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
import "../../App.css";
import Validation from "../../../../validation";
import { GET_USER, ADD_USER, DELETE_USER, USER_SIGNIN } from "../../Query";
import Signup from "../Signup/Create";
import axios from "axios";

class signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      email_err: "",
      password_err: "",
      token: null,
      jwt_token: null,
      message: "",
      status: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onblur = e => {
    let error = "";
    console.log(e.target, "signin EEE");
    if (e.target.name == "email") {
      if (e.target.value) {
        let test = Validation.validate_email(e.target.value);
        error = !test;
        this.setState({
          emailError: error
        });
      }
    }

    if (e.target.name == "password") {
      if (e.target.value) {
        let test = Validation.validate_password(e.target.value);
        let pass_err = !test;
        console.log(pass_err, "PASS ERRPR");
        this.setState({
          passwordError: pass_err
        });
      }
    }
  };
  onChange(e) {
    console.log(e, "SIGNIN");
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  onSubmit(e) {
    console.log(e, "ONSUBMIT ---");
    var body = {
      email: this.state.email,
      password: this.state.password,
      token: this.state.token
    };
    e.preventDefault();
    axios.post("http://localhost:8001/api/user/signin", body).then(data => {
      if (data) {
        this.setState({
          jwt_token: data.data.token || "",
          message: data.data.message,
          status: data.data.status
        });
      }
    });
  }

  componentDidMount() {
    if (this.props.location && this.props.location.pathname) {
      let { pathname } = this.props.location;
      pathname = pathname.split("/");
      pathname = pathname[2];
      this.setState(
        {
          token: pathname
        },
        () => console.log("pathname", pathname)
      );
    }
  }

  render() {
    const styles = {
      inputContainer: {
        width: "30%"
      }
    };
    return (
      <div className="container" style={styles.inputContainer}>
        <h1 className="h1 mb-3 font-weight-normal">Signin</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="name">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              onBlur={e => {
                this.onblur(e);
              }}
              value={this.state.email === null ? "" : this.state.email}
              required
            />
            <div className="text-danger">{this.state.email_err}</div>
          </FormGroup>
          <FormGroup>
            <Label for="name">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              onBlur={e => {
                this.onblur(e);
              }}
              value={this.state.password === null ? "" : this.state.password}
              required
            />
            <div className="text-danger">{this.state.password_err}</div>
          </FormGroup>
          <Button
            disabled={
              this.state.emailError !== false &&
              this.state.passwordError !== false
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
