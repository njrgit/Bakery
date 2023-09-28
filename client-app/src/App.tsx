import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";

function App() {
  const [products, setProducts] = useState([]);

  //Empty array will only run once in the dependencies
  useEffect(() => {
    axios.get("http://localhost:5000/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <div>
        <Header as="h2" textAlign="center">
          <Icon name="food" circular />
          <Header.Content>Niro's Bakery</Header.Content>
        </Header>
        <List>
          {products.map((p: any) => (
            <List.Item key={p.id}>{p.name}</List.Item>
          ))}
        </List>
      </div>
    </>
  );
}

export default App;
