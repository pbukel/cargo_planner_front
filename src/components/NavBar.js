import React from "react";
import styled from "styled-components";
import { mobile } from "../styles/responsive";
import { Search } from "@mui/icons-material";
import { useContext, useRef } from "react";
import mainContext from "../context/mainContext";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  height: 8%;
  background-color: lightgray;
  display: flex;
  align-items: center;
  border: 2px solid black;
  ${mobile({ padding: "10px" })}
`;
const Wrapper = styled.div`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column", padding: "0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Name = styled.span`
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;
const Center = styled.div`
  flex: 3;
  text-align: center;
  ${mobile({ width: "100%" })}
`;
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "0px" })}
`;
const Input = styled.input`
  border: 1px solid black;
  width: 100%;
  border-radius: 12px;
  height: 20px;
  padding-left: 30px;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-around;
  ${mobile({ width: "100%" })}
`;
const Button = styled.button`
  height: 25px;
  width: 70px;
`;

const NavBar = () => {
  const { id } = useParams();
  const searchInput = useRef();
  const nav = useNavigate();
  const { setAllCompanys, inputBoxesVlaue } = useContext(mainContext);

  //load function to load data over the network
  function load() {
    fetch("http://localhost:4000/addUser")
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("shipments", JSON.stringify(data.data));
        setAllCompanys(data.data);
        nav("/");
      });
  }
  function navigateToMain() {
    nav("/");
  }
  function save() {
    const lastChar = inputBoxesVlaue.at(-1);
    let modInput = inputBoxesVlaue;
    //avoid of entering comma as the last.
    if (lastChar === ",") {
      modInput = inputBoxesVlaue.slice(0, -1);
    }
    const data = JSON.parse(localStorage.getItem("shipments"));
    const foundIndex = data.findIndex((item) => item.id === id);
    data[foundIndex].boxes = modInput;
    localStorage.setItem("shipments", JSON.stringify(data));
    setAllCompanys(data);
  }
  //search for company
  function handleSearch() {
    const data = JSON.parse(localStorage.getItem("shipments"));

    const filtered = data.filter((company) =>
      company.name
        .toLowerCase()
        .includes(searchInput.current.value.toLowerCase())
    );

    setAllCompanys(filtered);
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          <Name onClick={() => navigateToMain()}>Cargo Planner</Name>
        </Left>
        <Center>
          <SearchContainer>
            <Search
              style={{
                color: "grey",
                fontSize: 16,
                position: "absolute",
                paddingLeft: "10px",
              }}
            />
            <Input
              ref={searchInput}
              onChange={() => handleSearch()}
              placeholder="Search"
            />
          </SearchContainer>
        </Center>
        <Right>
          <Button onClick={() => load()}>Load</Button>
          <Button onClick={() => save()}>Save</Button>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavBar;
