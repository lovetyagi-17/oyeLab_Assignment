const person = {
  id: 2,
  gender: "mail",
};
const student = {
  name: "ravi",
  email: "ravi11@yopmail.com",
};

const universal = Object.assign({}, person, student);
console.log(universal);
