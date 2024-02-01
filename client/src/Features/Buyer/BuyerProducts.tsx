import React, { useEffect, useState } from "react";
import ProductCard from "../Seller/ProductCard";
import callApi from "../../utlils/callApi";
import Loading from "../../utlils/Loading";

const BuyerProducts: React.FC = () => {
  const [products, setProducts] = useState<object[] | undefined>(undefined);

  const fetchProducts = async () => {
    const res = await callApi("/api/product/get-all-products", "GET");
    setProducts(res.data.products);
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
              <h1 className="text-primary">
                There are not products available at this time, please try after
                sometime!
              </h1>
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

export default BuyerProducts;
