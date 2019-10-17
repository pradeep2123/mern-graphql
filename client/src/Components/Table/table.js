import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Button,
  Form,
  FormGroup,
  Container,
  Row,
  Col,
  Label,
  Input,
  Table
} from "reactstrap";
import axios from "axios";
import ReactDOM from "react-dom";

class table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      key: [],
      values: [],
      error: ""
    };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:8001/api/customers`)
      .then(res => {
        const data = res.data;
        const key = Object.keys(data[0]);
        console.log(data, "data");
        if (data.length == 0) {
          this.setState({ error: "No Data found" });
        }
        this.setState({ values: [...data], key }, () => {
          console.log(this.state.values);
        });
      })
      .catch(error => {
        alert(error);
        this.setState({ error: "No Data found" });
      });
  }
  renderTableHeader() {
    let header = this.state.key;
    return header.map((value, index) => {
      return (
        <th key={index}>
          <tr>{value.toUpperCase()}</tr>
        </th>
      );
    });
  }

  // renderTableData() {
  //   return this.state.values.map((value, index) => {
  //     return (
  //       <th key={index}>
  //         <td>{value}</td>
  //       </th>
  //     );
  //   });
  // }
  renderMyTable() {
    return (
      this.state.values.length > 0 &&
      this.state.values.map((value, index) => {
        console.log(value, "myvalue");
        return (
          <tr key={index}>
            <td>{value.id}</td>
            <td>{value.firstName}</td>
            <td>{value.lastName}</td>
          </tr>
        );
      })
    );
  }

  render() {
    // console.log(this.state.values, "Valll");
    return (
      <React.Fragment>
        <h1>Table</h1>

        <div className="text-danger">
          <h3>{this.state.error}</h3>
        </div>

        <Container>
          <Row>
            <Col md={6} sm={6} xs={12}>
              <Table>
                <thead>{this.renderTableHeader()}</thead>
                <tbody>{this.renderMyTable()}</tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default table;
