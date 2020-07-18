const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: String,
  description: String,
  year: Number, // sadece yılı aldığımız için date vermeye gerek yok
  directorId: String,
});

module.exports = mongoose.model("Movie", movieSchema);
