const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const directorSchema = new Schema({
  name: String,
  birth: Number, // sadece yılı aldığımız için date vermeye gerek yok
});

module.exports = mongoose.model("Director", directorSchema);
