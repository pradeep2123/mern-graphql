import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Validation from "../../../../validation";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      error: "",
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onBlur = e => {
    let error = "";
    console.log(e.target, "EEE");
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

  onSubmitForm(e) {
    var body = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };
    e.preventDefault();
    axios
      .post("http://localhost:8001/api/user/signup", body)
      .then(data => {
        console.log(data, "=----ITEM----=");

        if (data) {
          debugger;
          this.setState({
            message: data.data.error || data.data.message,
            email: "",
            password: "",
            name: ""
          });
        }
      })
      .catch(error => {
        console.log(error, "Error");
        this.setState({ error: "Error on retrieve signup" });
      });
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
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={this.onChange}
              onBlur={e => {
                this.onBlur(e);
              }}
              value={this.state.name === null ? "" : this.state.name}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              required
              type="email"
              name="email"
              id="email"
              onChange={this.onChange}
              onBlur={e => {
                this.onBlur(e);
              }}
              value={this.state.email === null ? "" : this.state.email}
            />
            <div className="text-danger">{this.state.emailError}</div>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              onBlur={e => {
                this.onBlur(e);
              }}
              value={this.state.password === null ? "" : this.state.password}
              required
            />
            <div className="text-danger">{this.state.passwordError}</div>
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
        <div className="text-danger">{this.state.message}</div>
      </div>
    );
  }
}

export default Signup;
