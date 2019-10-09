import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      email: "",
      emailError: "",
      password: "",
      error: "",
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }
  onChange(e) {
    console.log(e, "EEEE");
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleBlur = () => {
    if (this.state.email) {
      this.setState({ emailError: "email is invalid" });
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
        // alert(JSON.stringify(data));
        console.log(data, "=----ITEM----=");

        if (data) {
          this.setState({
            message: data.data.error || data.data.message,
            email: "",
            password: "",
            name: ""
          });
          alert(JSON.stringify(this.state.message));
        } else {
          alert("NO Data");
        }
        // data ? data.data
        //
        //
      })
      .catch(error => {
        console.log(error, "Error");
        this.setState({ error: "Error on retrieve signup" });
      });
  }

  render() {
    return (
      <Container>
        <h1 className="h1 mb-3 font-weight-normal">SignUp</h1>
        <Form onSubmit={this.onSubmitForm}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              onChange={this.onChange}
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
              onBlur={this.handleBlur}
              value={this.state.email === null ? "" : this.state.email}
            />
            <div>{this.state.emailError}</div>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              value={this.state.password === null ? "" : this.state.password}
              required
            />
          </FormGroup>
          <NavLink to="/home">
            <Button
              disabled={
                this.state.email === "" &&
                this.state.password === "" &&
                this.state.name === ""
              }
            >
              Submit
            </Button>
          </NavLink>
        </Form>
        <div>{this.state.message}</div>
      </Container>
    );
  }
}

export default Signup;
