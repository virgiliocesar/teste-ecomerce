const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//^ Definition of Product Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "O nome do produto é obrigatório."],
    trim: true, // Remove espaços em branco no início e no fim
    minlength: [3, "O nome do produto deve ter pelo menos 3 caracteres."],
  },
  category: {
    type: String,
    required: [true, "A categoria do produto é obrigatória."],
    trim: true,
    minlength: [3, "A categoria do produto deve ter pelo menos 3 caracteres."],
  },
  description: {
    type: String,
    required: [true, "A descrição do produto é obrigatória."],
    trim: true,
    minlength: [3, "A descrição do produto deve ter pelo menos 3 caracteres."],
  },
  price: {
    type: Number,
    required: [true, "O preço do produto é obrigatório."],
  },
  oldPrice: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, "A imagem do produto é obrigatória."],
  },
  color: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "A avaliação não pode ser menor que 0."],
    max: [5, "A avaliação não pode ser maior que 5."],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "O autor do produto é obrigatório."],
  },
},{ timestamps: true });


const Products = model("Product", productSchema);

module.exports = Products;
