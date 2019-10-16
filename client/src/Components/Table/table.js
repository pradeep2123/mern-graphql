import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Form, FormGroup, Container, Label, Input } from "reactstrap";
import axios from "axios";
import ReactDOM from "react-dom";
import { value } from "pg-sql2";

// function table() {
//   return axios
//     .get("https://jsonplaceholder111.typicode.com/todos")
//     .then(data => {
//       alert(data, "DAta ");
//     })
//     .catch(error => {
//       alert(error);
//     });
// }
// const element = <h1>{table}</h1>;

// ReactDOM.render(element, document.getElementById("root"));
class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: [],
      values: [],
      data: []
    };
  }
  componentDidMount() {
    axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const data = res.data;
        const { values } = this.state;
        const key = Object.keys(data[0]);
        data.map(function(val) {
          var split_value = Object.values(val);
          values.push(split_value);
        });
        this.setState({ key, values, data });
      })
      .catch(error => {
        alert(error);
      });
  }
  renderTableHeader() {
    let header = this.state.key;
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  renderTableData() {
    return this.state.values.map((values, index) => {
      const { id, name, email } = values; //destructuring
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div>
        <h1 id="title">React Dynamic Table</h1>
        <table id="students">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default table;

// <ul>
// {this.state.key.map(val => (
//   <li>{val}</li>
// ))}
// </ul>
