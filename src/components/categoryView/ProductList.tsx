import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductData } from "../../data/ProductData";
import ProductListPaper from "../reusableComponents/ProductListPaper";
import ProductListContainer from "../reusableComponents/ProductListContainer";
import productFunction from "../../api/productFunction";

const ProductList = ({ products }: any) => {
  return (
    <ProductListContainer>
      {products.map((product: any) => (
        <ProductListPaper
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          image={product.imageUrl}
        />
      ))}
    </ProductListContainer>
  );
};

export default ProductList;
