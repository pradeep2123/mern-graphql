var moment = require("moment");

module.exports = {
  validate_email: function(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  },
  validate_password: function(password) {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    return strongRegex.test(password);
  },
  time_difference: function(start_date) {
    try {
      return new Promise((resolve, reject) => {
        var retrieved_date = moment(start_date);
        console.log(start_date, "Start Date");
        console.log(retrieved_date, "REtrieved Date");
        // UTC to local time

        var start_hours = moment
          .utc(start_date, "YYYY-MM-DD hh")
          .format("YYYY-MM-DD hh:mm A");
        console.log(start_hours, "Start hours");

        // ***************** ADDED 1 hour *********************//
        var add_hours = retrieved_date.add(moment.duration(1, "hours"));
        console.log(add_hours, "ADD hours");

        var added_time = moment
          .utc(add_hours, "YYYY-MM-DD hh")
          .format("YYYY-MM-DD hh:mm A");

        var current_time = moment(Date.now()).format("YYYY-MM-DD hh:mm A");
        console.log(current_time, "current");
        console.log(added_time, "added");
        if (current_time > added_time) {
          console.log("-------");
          resolve(true);
          // return true;
        } else {
          // return false;
          resolve(false);
        }
      });
    } catch (err) {
      return err;
    }
  }
};
