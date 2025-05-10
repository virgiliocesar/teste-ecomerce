const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Definição do schema de avaliações (Reviews)
const ReviewsSchema = new Schema(
  {
    comment: {
      type: String,
      required: [true, "O comentário é obrigatório."],
    },
    rating: {
      type: Number,
      required: [true, "A avaliação é obrigatória."],
      min: [1, "A avaliação mínima é 1."],
      max: [5, "A avaliação máxima é 5."],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "O ID do usuário é obrigatório."],
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "O ID do produto é obrigatório."],
    },
  },
  { timestamps: true }
); //^ Adiciona campos createdAt e updatedAt automaticamente

const Reviews = model("Reviews", ReviewsSchema);

module.exports = Reviews;
