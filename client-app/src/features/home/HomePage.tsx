import { Link } from "react-router-dom";
import { Button, Container, Header, Icon } from "semantic-ui-react";


export default function HomePage() {
  return (
    <Container
      textAlign="center"
      style={{
        paddingTop:"10%"
      }}
    >
      <Header
        as="h1"
        style={{
          color: "white",
        }}
        icon
      >
        <Icon name="food" />
        Niro's Nibbles
        <Header.Subheader style={{ color: "white" }}>
          Spice in the right place
        </Header.Subheader>
        <Button
          style={{ marginTop: "10%" }}
          as={Link}
          to={"/veg"}
          primary
          size="huge"
        >
          Feed Me
        </Button>
      </Header>
    </Container>
  );
}
