import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import callApi from "../../../utlils/callApi";
import { NavLink } from "react-router-dom";

const Products: React.FC = () => {
  const [products, setProducts] = useState<object[] | undefined>(undefined);

  const fetchProducts = async () => {
    const res = await callApi("/api/product/get-products", "GET");
    setProducts(res.data.products);
    console.log("Product data: ", res.data.products);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return products ? (
    <>
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column w-full ">
              <h1 className="text-primary">You have not added any products!</h1>
              <NavLink to="/s/add-product" className="btn btn-primary">
                Add Product
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <h1 className="text-primary">Loading....</h1>
    </>
  );
};

export default Products;
