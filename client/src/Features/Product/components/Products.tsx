import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import callApi from "../../../utlils/callApi";

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await callApi("/api/product/get-products", "GET");
    console.log("res: ", res.data.products);
    setProducts(res.data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return products ? (
    <>
      <div className="container">
        <div className="row">
          {products.map((product, index) => {
            return (
              <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <>Loading....</>
  );
};

export default Products;
