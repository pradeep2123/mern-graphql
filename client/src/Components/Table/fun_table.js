import {
  Button,
  Form,
  FormGroup,
  Container,
  Input,
  Table,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import React, { useState, ReactDOM, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

function fun_table() {
  const [data, setData] = useState({ hits: [], key_data: [], error: "" });
  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios.get("http://localhost:8001/api/customers");
      if (!result) {
        setData({ error: "No Data Found" });
      }
      if (!ignore) {
        console.log(result.data, "RESULT DA");
        let keys = Object.keys(result.data[0]);

        setData({
          hits: [...result.data],
          key_data: keys
        });
      }
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, []);
  function renderTableHeader() {
    let header = data.key_data;
    return header.map((value, index) => {
      return (
        <th key={index}>
          <tr>{value.toUpperCase()}</tr>
        </th>
      );
    });
  }

  function renderMyTable() {
    return (
      data.hits.length > 0 &&
      data.hits.map((value, index) => {
        console.log(value, "My value ...");
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
  return (
    <React.Fragment>
      <h1>Table</h1>

      <div className="text-danger">
        <h3>{data.error}</h3>
      </div>

      <Container>
        <Row>
          <Col md={6} sm={6} xs={12}>
            <Table>
              <thead>{renderTableHeader()}</thead>
              <tbody>{renderMyTable()}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default fun_table;

// function fun_table() {
//     const [state, setState] = useState(0);

//     //its like componentdidmount and Componentdidupdate
//     useEffect(async() => {
//       // Update the document title using the browser API
//       document.title = `You clicked ${state} times`;
//     });
//     return (
//       <div>
//         <p>You clicked {state} times</p>

//         <button onClick={() => setState(state + 1)}>{state}</button>
//       </div>
//     );
//   }
