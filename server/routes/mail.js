const data = require("../config/data").data;
const sgMail = require("sendgrid")(data.Send_grid_api);

const sendMailToNewUser = (email, token) => {
  var request = sgMail.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: {
      personalizations: [
        {
          to: [
            {
              email: email
            }
          ],
          subject: "UHC-Verifying the User"
        }
      ],
      from: {
        email: "praba@crayond.co"
      },
      content: [
        {
          type: "text/plain",
          value:
            "Hello,\n" +
            "Please click the link to verify and login to continue services and link will valid till one hour" +
            "\n" +
            "\n http://localhost:3000/signin/" +
            token
        }
      ]
    }
  });

  // With promise
  return sgMail
    .API(request)
    .then(function(response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
      return {
        status: response.statusCode
      };
    })
    .catch(function(error) {
      // error is an instance of SendGridError
      // The full response is attached to error.response
      console.log(error.response.statusCode);
      return {
        status: error.statusCode
      };
    });
};

module.exports = {
  sendMailToNewUser: sendMailToNewUser
};
