users: (parent, args, { db }, info) => {
  return db.Users.findAll();
};
