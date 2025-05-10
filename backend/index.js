const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000;
const url = process.env.MONGO_DB;
const { getBaseUrl } = require("./src/utils/baseUrl");
const baseUrl = getBaseUrl();

// Middleware setup
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      baseUrl,
    credentials: true,
  })
);

//^image upload
const uploadImage = require("./src/utils/uploadImage");


//^ all routes
const authRules = require("./src/users/user.route");
const productRoutes = require("./src/products/products.route.js");
const reviewRoutes = require("./src/reviews/reviews.router.js");
const orderRoutes = require("./src/orders/orders.route.js");
const statsRoutes = require("./src/stats/stats.route.js");
const { base } = require("./src/users/user.model.js");

app.use("/api/auth", authRules);
app.use("/api/products", productRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stats", statsRoutes);


main()
  .then(() => console.log("conectado ao MongoDB com sucesso"))
  .catch((err) => console.log(err));

  app.get("/", (req, res) => {
    res.send("Fashion E-commerce Server!");
  });

//^ Connect to MongoDB database
async function main() {
  await mongoose.connect(url);
}

app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);

});
