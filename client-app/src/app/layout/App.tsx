import { useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import { Product } from "../models/product";
import MenuBar from "./MenuBar";
import ProductMenu from "../../features/product/menu/ProductMenu";
import { v4 as uuidv4 } from "uuid";
import httpClient from "../api/httpclient";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sumitting, setSubmitting] = useState(false);

  //Empty array will only run once in the dependencies
  useEffect(() => {
    httpClient.Products.list().then((response) => {
      setProducts(response);
      setLoading(false);
    });
  }, []);

  function handleDeleteProduct(id: string) {
    setSubmitting(true);
    httpClient.Products.delete(id).then(() => {
      setProducts(products.filter((x) => x.id !== id));
      setSubmitting(false);
    });
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
    setSubmitting(true);
    if (product.id) {
      httpClient.Products.update(product).then(() => {
        setProducts([...products.filter((x) => x.id !== product.id), product]);
        setEditMode(false);
        setSelectedProduct(product);
        setSubmitting(false);
      });
    } else {
      product.id = uuidv4();
      httpClient.Products.create(product).then(() => {
        setProducts([...products, product]);
        setEditMode(false);
        setSelectedProduct(product);
        setSubmitting(false);
      });
    }
  }

  if (loading) return <LoadingComponent content="Baking..." />;

  if (sumitting) return <LoadingComponent content="Updating...." />;

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
