import { Button, Form, Segment } from "semantic-ui-react";
import { ChangeEvent, useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../../app/layout/styles.css"

export default observer(function ProductForm() {
  const nav = useNavigate();

  const { productStore } = useStore();
  const {
    closeForm,
    selectedProduct,
    createProduct,
    updateProduct,
    loadProduct,
    submitLoading
  } = productStore;

  const { id } = useParams();

  const initialProductState = {
    id: "",
    name: "",
    description: "",
    category: "",
    price: 0,
  };

  const [product, setProduct] = useState(initialProductState);

  useEffect(() => {
    if (id) {
      loadProduct(id).then((productFromStore) => {
        setProduct(productFromStore!);
      });
      console.log(`useEffect - current product id ${selectedProduct?.id}`);
    }
  }, [id, loadProduct]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  }

  function handleSubmit() {
    product.id
      ? updateProduct(product).then(() => nav("/veg"))
      : createProduct(product).then(() => nav("/veg"));
  }

  return (
    <Segment className="uiForm" clearing>
      <Form className="uiForm" onSubmit={handleSubmit}>
        <Form.Field>
          <label className="formLabel">Name</label>
          <input
            className="uiForm"
            name="name"
            placeholder="Name"
            value={product.name}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label className="formLabel">Description</label>
          <input
            name="description"
            className="uiForm"
            placeholder="Description"
            value={product.description}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label className="formLabel">Category</label>
          <input
            name="category"
            className="uiForm"
            placeholder="Category"
            value={product.category}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <label className="formLabel">Price</label>
          <input
            name="price"
            className="uiForm"
            placeholder="Price"
            value={product.price}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Button type="submit" loading={submitLoading} positive floated="right">
          Submit
        </Button>
        <Button
          onClick={() => closeForm()}
          as={Link}
          to={"/veg"}
          type="button"
          floated="right"
        >
          Cancel
        </Button>
      </Form>
    </Segment>
  );
});
