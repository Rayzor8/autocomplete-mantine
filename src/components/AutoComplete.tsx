import React, { forwardRef, useEffect, useId, useState } from "react";
import {
  Autocomplete,
  Box,
  Group,
  Input,
  SelectItemProps,
  Text,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { ProductsType } from "../types";

interface ItemProps extends SelectItemProps {
  id: string;
  description: string;
  title: string;
}

interface AutoCompleteProps {
  setSelectedId: React.Dispatch<React.SetStateAction<null>>;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ description, value, id, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Box sx={{ padding: "5px" }}>
            <Text>{value}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </Box>
        </Group>
      </div>
    );
  }
);

const AutoComplete = ({ setSelectedId }: AutoCompleteProps) => {
  const [products, setProducts] = useState<ProductsType | null>(null);
  const [value, setValue] = useState("");
  const id = useId();
  const [debounced] = useDebouncedValue(value, 500);

  useEffect(() => {
    (async () => {
      const res = await fetch(
        `https://dummyjson.com/products/search?q=${debounced}`
      );
      const data = await res.json();
      setProducts(data);
    })();
  }, [debounced]);

  return (
    <Input.Wrapper id={id} label="Search Product" required maw={320}>
      <Autocomplete
        value={value}
        onChange={setValue}
        onItemSubmit={(products) => setSelectedId(products.id)}
        id={id}
        itemComponent={AutoCompleteItem}
        limit={100}
        placeholder="Pick one"
        data={
          products?.products.map((product) => ({
            description: product.description,
            value: product.title,
            id: product.id,
          })) || []
        }
      />
    </Input.Wrapper>
  );
};

export default AutoComplete;
