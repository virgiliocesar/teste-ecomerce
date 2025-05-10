const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

//^ Definição do schema do usuário
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "O nome de usuário é obrigatório."],
    unique: true,
    trim: true, // Remove espaços em branco no início e no fim
    minlength: [3, "O nome de usuário deve ter pelo menos 3 caracteres."],
  },
  email: {
    type: String,
    required: [true, "O email é obrigatório."],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, insira um email válido.",
    ], // Validação de email
  },
  password: {
    type: String,
    required: [true, "A senha é obrigatória."],
    minlength: [6, "A senha deve ter pelo menos 6 caracteres."],
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Define os valores permitidos
    default: "user",
  },
  profileImage: {
    type: String,
    default: "", // Campo opcional, padrão vazio
  },
  bio: {
    type: String,
    maxlength: [200, "A biografia não pode ter mais de 200 caracteres."],
    default: "", // Campo opcional, padrão vazio
  },
  profession: {
    type: String,
    default: "", // Campo opcional, padrão vazio
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//^ hashing password
userSchema.pre("save", async function (next) {
  const user = this
  if(!user.isModified("password")) return next()
   const hashedPassword = await bcrypt.hash(user.password, 10)
  user.password = hashedPassword
  next()
});

//^ match password
userSchema.methods.comparePassword = function (cadidatePassword) {
  return bcrypt.compare(cadidatePassword, this.password)
}


const User = model("User", userSchema);

module.exports = User;
