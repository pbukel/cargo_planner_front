import { useNavigate, useParams } from "react-router-dom";
import { React, useContext } from "react";
import styled from "styled-components";
import { mobile } from "../styles/responsive";
import CompanyDetails from "./CompanyDetails";
import mainContext from "../context/mainContext";

const Container = styled.div`
  height: 84%;
  display: flex;
  align-items: center;
  ${mobile({ padding: "10px", height: "50%" })}
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ flexDirection: "column" })}
`;
const Left = styled.div`
  height: 100%;
  border: 2px solid black;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  ${mobile({ width: "100%" })}
`;
const Right = styled.div`
  height: 100%;
  border: 2px solid black;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  ${mobile({ width: "100%" })}
`;
const CompanyName = styled.a`
  cursor: pointer;
  margin-top: 15px;
`;

function DataPlace() {
  const { allCompanys } = useContext(mainContext);
  const nav = useNavigate();
  const { id } = useParams();

  function handleCompanySelect(id) {
    nav("/" + id);
  }
  return (
    <Container>
      <Wrapper>
        <Left>
          {allCompanys &&
            allCompanys.map((item, index) => (
              <CompanyName
                key={index}
                href=""
                onClick={() => handleCompanySelect(item.id)}
              >
                {item.name}
              </CompanyName>
            ))}
        </Left>
        {id === undefined ? <Right></Right> : <CompanyDetails />}
      </Wrapper>
    </Container>
  );
}

export default DataPlace;
