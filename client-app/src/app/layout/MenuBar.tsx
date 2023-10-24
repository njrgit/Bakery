import { Icon, Menu } from "semantic-ui-react";
import "./styles.css";
import { NavLink, useLocation } from "react-router-dom";

export default function MenuBar()
{
  console.log(useLocation());

  return (
    <Menu icon="labeled">
      <Menu.Item as={NavLink} to="" header>
        <Icon name="ils" />
        Niro's Bakery
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        index={1}
        to="/nonveg"
        name="Veg Savoury Items"
      >
        <Icon name="leaf" />
        Veg Savoury Items
      </Menu.Item>
      <Menu.Item
        as={NavLink}
        index={2}
        to="/veg"
        name="Meat Savoury Items"
      >
        <Icon name="sticker mule" />
        Meat Savoury Items
      </Menu.Item>
    </Menu>
  );
}
