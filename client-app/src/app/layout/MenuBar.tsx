import { Button, Icon, Menu } from "semantic-ui-react";
import "./styles.css";

export default function MenuBar() {
  return (
    <Menu icon="labeled">
      <Menu.Item header>
        <Icon name="ils" />
        Niro's Bakery
      </Menu.Item>
      <Menu.Item name="Veg Savoury Items">
        <Icon name="leaf" />
        Veg Savoury Items
      </Menu.Item>
      <Menu.Item name="Meat Savoury Items">
        <Icon name="sticker mule" />
        Meat Savoury Items
      </Menu.Item>
    </Menu>
  );
}
