import React, { Component } from "react";
import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
import axios from "axios";

import Validation from "../../../../validation";

class forgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      email_status: "",
      email_error: "",
      error: "",
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    console.log(e, "CHANGE EEEEEEEEEEEEE");
    this.setState({
      email: e.target.value
    });
    let { email_error } = this.state;
    if (e.target.name == "email") {
      if (e.target.value) {
        let test = Validation.validate_email(e.target.value);
        email_error = !test;
        this.setState({
          email_error
        });
      }
    }
  }
  onSubmit(e) {
    var body = {
      email: this.state.email
    };
    e.preventDefault();
    axios
      .post("http://localhost:8001/api/user/forgot", body)
      .then(data => {
        console.log(data, "Forgot PAssword Data");
        this.setState({
          email_status: data.data.status,
          message: data.data.message
        });
      })
      .catch(error => {
        console.log(error, "Error on forgot password");
        this.setState({ error: "Error on forgot Password, mail not sent" });
      });
  }
  render() {
    const styles = {
      inputContainer: {
        width: "30%"
      }
    };
    var email_message;
    if (this.state.email_status == 201) {
      email_message = <div className="text-success">{this.state.message}</div>;
    } else {
      email_message = <div className="text-danger">{this.state.error}</div>;
    }
    if (this.state.email_status == 404) {
      alert(this.state.email_status);

      email_message = <div className="text-danger">{this.state.message}</div>;
    }

    return (
      <div className="container" style={styles.inputContainer}>
        <h1 className="h1 mb-3 font-weight-normal">Forgot Password</h1>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="Email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={this.onChange}
              value={this.state.email === null ? "" : this.state.email}
              required
            />
          </FormGroup>
          <Button
            disabled={this.state.email_error !== false}
            className="btn btn-success"
          >
            Submit
          </Button>
        </Form>
        {email_message}
      </div>
    );
  }
}
export default forgotPassword;
