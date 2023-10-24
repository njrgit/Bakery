import { Button, ButtonGroup, Icon, Item, ItemGroup } from "semantic-ui-react";
import "../../../app/layout/styles.css";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Link } from "react-router-dom";

export default observer(function ProductList() {
  const { productStore } = useStore();
  const { deleteProduct, getProductsInAlphabeticalOrder } =
    productStore;

  //Empty array will only run once in the dependencies
  useEffect(() => {
    productStore.loadProducts();
  }, [productStore]);

  if (productStore.loading) return <LoadingComponent content="Baking..." />;

  return (
    <ItemGroup>
      {getProductsInAlphabeticalOrder.map((product) => (
        <Item key={product.id}>
          <Item.Image
            size="small"
            src={`/public/foodImages/${product.category}.jpg`}
          />
          <Item.Content verticalAlign="middle">
            <Item.Header className="prouctItemHeader">
              {product.name}
            </Item.Header>
            <Item.Meta>
              <span className="prouctItemHeader">{product.price}</span>
            </Item.Meta>
            <Item.Meta>
              <span className="prouctItemHeader">{product.category}</span>
            </Item.Meta>
            <Item.Description className="prouctItemHeader">
              {product.description}
            </Item.Description>
            <Item.Extra>
              <ButtonGroup>
                <Button primary>
                  Order
                  <Icon name="chevron circle right" />
                </Button>
                <Button
                  as={Link}
                  to={`/products/${product.id}`}
                  primary
                >
                  Edit
                  <Icon name="chevron circle right" />
                </Button>
                <Button
                  color="red"
                  onClick={() => {
                    deleteProduct(product.id);
                  }}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </ItemGroup>
  );
});
