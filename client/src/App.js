import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
// import Users from "./Components/User/user";
// import Signup from "./Components/Signup/signup";
import Create from "./Components/Signup/Create";
import Table from "./Components/Table/table";
import Fun_Table from "./Components/Table/fun_table";
class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <div className="App-header"></div> */}
        {/* <Create /> */}
        {/* <Table /> */}
        <Fun_Table />
      </div>
    );
  }
}

export default App;
