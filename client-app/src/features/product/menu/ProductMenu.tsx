import { Button, Container, Grid, Icon } from "semantic-ui-react";
import { Product } from "../../../app/models/product";
import ProductList from "./ProductList";
import ProductForm from "../form/ProductForm";

interface Props {
  products: Product[];
  selectedProduct: Product | undefined;
  selectProduct: (id: string) => void;
  editMode: boolean;
  formOpen: (id?: string) => void;
  formClose: () => void;
  editProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
}

export default function ProductMenu({
  products,
  selectedProduct,
  selectProduct,
  editMode,
  formOpen,
  formClose,
  editProduct,
  deleteProduct,
}: Props) {
  return (
    <>
      <Container style={{ marginBottom: "2em" }}>
        <Button onClick={() => formOpen()} color="blue" animated="vertical">
          <Button.Content hidden>Add</Button.Content>
          <Button.Content visible>
            <Icon name="add" />
          </Button.Content>
        </Button>
      </Container>

      <Grid columns={2}>
        <ProductList
          products={products}
          selectProduct={selectProduct}
          formOpen={formOpen}
          deleteProduct={deleteProduct}
        />
        {editMode && (
          <ProductForm
            selectedProduct={selectedProduct}
            formClose={formClose}
            editProduct={editProduct}
          />
        )}
      </Grid>
    </>
  );
}
