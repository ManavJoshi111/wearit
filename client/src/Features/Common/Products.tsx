import React from "react";
import ProductCard from "./ProductCard";
import Loading from "../../utlils/Loading";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import ProductType from "../../types/product.types";

const Products: React.FC = () => {
  const { products } = useSelector((state: RootState) => state.product);
  return products ? (
    <>
      <div className="container">
        <div className="row">
          {products.length > 0 ? (
            products.map((product: ProductType, index: number) => {
              return (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center align-items-center"
                  key={index}
                >
                  <ProductCard product={product} />
                </div>
              );
            })
          ) : (
            <div className="d-flex justify-content-center align-items-center flex-column w-full ">
              <h1 className="text-primary">No products found!</h1>
            </div>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <Loading />
    </>
  );
};

export default Products;
