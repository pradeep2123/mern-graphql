import gql from "graphql-tag";

const GET_USER = gql`
  query getuser($email: String!) {
    getuser(email: $email) {
      id
      name
      email
    }
  }
`;
const DELETE_USER = gql`
  mutation removeuser($id: String!) {
    removeuser(id: $id) {
      id
      name
    }
  }
`;
const ADD_USER = gql`
  mutation addUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      id
      name
      email
    }
  }
`;
const USER_SIGNIN = gql`
  mutation userSignin($email: String!, $password: String!) {
    userSignin(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;
export { GET_USER, DELETE_USER, ADD_USER, USER_SIGNIN };
