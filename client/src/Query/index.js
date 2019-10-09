import gql from "graphql-tag";

module.exports = {
  GET_USER: gql`
    query getuser($email: String!) {
      getuser(email: $email) {
        id
        name
        email
      }
    }
  `,
  DELETE_USER: gql`
    mutation removeuser($id: String!) {
      removeuser(id: $id) {
        id
        name
      }
    }
  `
};
