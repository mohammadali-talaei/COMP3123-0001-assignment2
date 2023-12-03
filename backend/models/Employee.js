const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  ID: {
    autoIncrement: true,
    type: String,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: {
    type: String,
    validate: {
      validator: function (value) {
        return ["female", "male", "other"].includes(value);
      },
      message: 'Gender must be "female," "male," or "other."',
    },
  },
  salary: {
    type: Number,
  },
});

module.exports = mongoose.model("employee", employeeSchema);
