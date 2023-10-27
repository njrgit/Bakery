import { Button, Container, Icon } from "semantic-ui-react";
import ProductList from "./ProductList";
import ProductForm from "../form/ProductForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

export default observer(function ProductMenu() {
  const { productStore } = useStore();
  const { editMode, openForm } = productStore;

  return (
    <>
      <Container style={{ marginBottom: "2em" }}>
        <Button
          as={NavLink}
          className="uiForm"
          to="/create"
          onClick={() => openForm()}
          color="blue"
          animated="vertical"
        >
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name="add" />
          </Button.Content>
        </Button>
      </Container>
      <ProductList />
      {editMode && <ProductForm />}
    </>
  );
});
