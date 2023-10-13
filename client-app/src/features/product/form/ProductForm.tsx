import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";

export default observer(function ProductForm() {
  const { productStore } = useStore();
  const { closeForm, selectedProduct,createProduct,updateProduct } = productStore;

  const initialProductState = selectedProduct ?? {
    id: "",
    name: "",
    description: "",
    category: "",
    price: 0,
  };

  const [product, setProduct] = useState(initialProductState);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  }

  function handleSubmit()
  {
    product.id ? updateProduct(product) : createProduct(product);
  }

  return (
    <Segment>
      (
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <input
            name="category"
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>
          <input
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button type="submit" positive floated="right">
          Submit
        </Button>
        <Button onClick={() => closeForm()} type="button" floated="right">
          Cancel
        </Button>
      </Form>
      )
    </Segment>
  );
})
