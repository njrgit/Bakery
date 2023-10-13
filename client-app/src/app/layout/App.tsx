import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import MenuBar from "./MenuBar";
import ProductMenu from "../../features/product/menu/ProductMenu";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { productStore } = useStore();;

  //Empty array will only run once in the dependencies
  useEffect(() =>
  {
    productStore.loadProducts();
  }, [productStore]);

  if (productStore.loading) return <LoadingComponent content="Baking..." />;

  return (
    <>
      <MenuBar />
      <Container style={{ marginTop: "3em" }}>
        <ProductMenu />
      </Container>
    </>
  );
}

export default observer(App);
