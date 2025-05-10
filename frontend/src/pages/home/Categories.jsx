import { Link } from "react-router";

import category1 from "../../assets/category-1.jpg";
import category2 from "../../assets/category-2.jpg";
import category3 from "../../assets/category-3.jpg";
import category4 from "../../assets/category-4.jpg";
const Categories = () => {
    const categories = [
      { name: "Acessórios", path: "acessórios", image: category1 },
      {
        name: "Vestidos",
        path: "vestidos",
        image: category2,
      },
      { name: "Jóias", path: "Jóias", image: category3 },
      { name: "Cosméticos", path: "cosméticos", image: category4 },
    ];

  return (
      <>
          <div className="product__grid">
              {
                  categories.map((category) => (
                      <Link to={`/categoria/${category.path}`} key={category.name} className="categories__card">
                          <img src={category.image} alt={category.name} />
                          <h4>{category.name}</h4>
                      </Link>
                  ))
              }
          </div>
      </>
  )
}

export default Categories