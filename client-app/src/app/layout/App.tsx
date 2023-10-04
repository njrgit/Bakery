import { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { Product } from "../models/product";
import MenuBar from "./MenuBar";
import ProductMenu from "../../features/product/menu/ProductMenu";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);

  //Empty array will only run once in the dependencies
  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:5000/api/products")
      .then((response) => {
        setProducts(response.data);
      });
  }, []);

  function handleDeleteProduct(id: string) {
    setProducts(products.filter((x) => x.id !== id));
  }

  function handleSelectProduct(id: string) {
    setSelectedProduct(products.find((x) => x.id === id));
  }

  function handleCancelSelectProduct() {
    setSelectedProduct(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectProduct(id) : handleCancelSelectProduct();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleEditProduct(product: Product) {
    product.id
      ? setProducts([...products.filter((x) => x.id !== product.id), product])
      : setProducts([...products, {...product, id: uuidv4()}]);
    setEditMode(false);
    setSelectedProduct(product);
  }

  return (
    <>
      <MenuBar />
      <Container style={{ marginTop: "3em" }}>
        <ProductMenu
          products={products}
          selectedProduct={selectedProduct}
          selectProduct={handleSelectProduct}
          editMode={editMode}
          formOpen={handleFormOpen}
          formClose={handleFormClose}
          editProduct={handleEditProduct}
          deleteProduct={handleDeleteProduct}
        />
      </Container>
    </>
  );
}

export default App;
