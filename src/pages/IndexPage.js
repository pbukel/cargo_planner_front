import React from "react";
import NavBar from "../components/NavBar";
import DataPlace from "../components/DataPlace";
import Footer from "../components/Footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const IndexPage = () => {
  return (
    <Container>
      <NavBar />
      <DataPlace />
      <Footer />
    </Container>
  );
};

export default IndexPage;
