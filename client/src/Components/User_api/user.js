import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import axios from "axios";

class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      error: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8001/api/user/get")
      .then(res => {
        console.log(res, "res");
        const persons = res.data.data;
        console.log(persons, "PERSONS");
        this.setState({ persons });
        console.log(this.state.persons, "-------------");
      })
      .catch(error => {
        console.log(error, "ERROR--");
        this.setState({ error: "Error on retrieving user" });
      });
  }

  render() {
    return (
      <ul>
        {this.state.persons.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    );
  }
}

export default Users;
