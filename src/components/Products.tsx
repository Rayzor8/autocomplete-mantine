import  { useState } from "react";
import AutoComplete from "./AutoComplete";
import ProductItem from "./ProductItem";

const Products = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div>
      <AutoComplete setSelectedId={setSelectedId} />
      <ProductItem id={selectedId} />
    </div>
  );
};

export default Products;
