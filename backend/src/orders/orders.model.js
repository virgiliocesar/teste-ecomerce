const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true, // Garante que o orderId seja único
      trim: true, // Remove espaços em branco no início e no fim
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.Mixed, // Aceita tanto ObjectId quanto String
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1, // Garante que a quantidade seja pelo menos 1
        },
      },
    ],
    amount: {
      type: Number,
      required: true,
      min: 0, // Garante que o valor não seja negativo
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Armazena o e-mail em minúsculas
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor, insira um e-mail válido",
      ], // Validação de e-mail
    },
    status: {
      type: String,
      enum: ["pendente", "processando", "enviado", "completo", "entregue"],
      default: "pendente",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
