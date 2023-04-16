import { Flex, Text } from "@mantine/core";
import { SingleProductType } from "../types";
import { useEffect, useState } from "react";
import { Image } from "@mantine/core";
type ProductProps = {
  id: null | string;
};

const ProductItem = ({ id }: ProductProps) => {
  const [singleProduct, setSingleProduct] = useState<SingleProductType | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        if (id) {
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          const data = await res.json();
          setSingleProduct(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);
  return (
    <>
      {!isLoading ? (
        <Flex
          sx={{ marginTop: "1rem" }}
          direction="column"
          gap={4}
          bg={singleProduct ? "#ccc" : "white"}
          maw={500}
          p="xl"
        >
          <Text>{singleProduct?.title}</Text>
          <Text>{singleProduct?.brand}</Text>
          <Text>{singleProduct?.description}</Text>
          {singleProduct && (
            <Image
              maw={240}
              radius="md"
              src={singleProduct?.thumbnail}
              alt="Product image"
            />
          )}
        </Flex>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default ProductItem;
