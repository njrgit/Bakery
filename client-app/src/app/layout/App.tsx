import { Container } from "semantic-ui-react";
import MenuBar from "./MenuBar";
import { observer } from "mobx-react-lite";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <>
      <MenuBar />
      <Container style={{ marginTop: "3em" }}>
        <Outlet />
      </Container>
    </>
  );
}

export default observer(App);
