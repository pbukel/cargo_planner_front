import { React, useState, useContext, useEffect, useRef } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { mobile } from "../styles/responsive";

import mainContext from "../context/mainContext";

const Container = styled.div`
  flex: 3;
  height: 100%;
`;

const InfoContainer = styled.div`
  margin: 20px;
  width: 40%;
  ${mobile({ width: "90%", margin: "auto" })}
`;
const CompanyInfo = styled.div`
  margin: 20px;
`;
const CompanyName = styled.h1`
  font-size: 40px;
  margin-bottom: 10px;
`;
const CompanyEmail = styled.a`
  font-size: 15px;
`;
const CargoInfo = styled.div`
  margin: 20px;
`;
const Cargo = styled.div``;
const Number = styled.span`
  font-weight: 800;
`;
const BoxesInfo = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;
const Boxes = styled.span`
  margin-bottom: 10px;
`;

const Input = styled.input``;

const CompanyDetails = () => {
  const inputValue = useRef();
  const { id } = useParams();
  const { setInputBoxesValue, setAllCompanys } = useContext(mainContext);
  const [cargo, setCargo] = useState();
  const data = JSON.parse(localStorage.getItem("shipments"));
  const selectedItem = data.find((item) => item.id === id);

  useEffect(() => {
    setCargo(baysCounter(selectedItem.boxes));
    setInputBoxesValue(inputValue.current.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to count "bays" based on box data.
  function baysCounter(boxes) {
    if (boxes === null) return 0;
    const bays =
      String(boxes)
        .split(",")
        .map((item) => parseFloat(item))
        .reduce((a, b) => a + b, 0) / 10;
    if (!bays) return "";
    if (bays % 1 > 0) return Math.trunc(bays) + 1;
    return Math.trunc(bays);
  }

  const [iputInfo, setInputInfo] = useState(selectedItem.boxes);

  const handleChange = (e) => {
    //do not left to input other than numbers, dot and comma.
    const value = e.target.value.replace(/[^0-9 \c,.]/, "");
    setInputInfo(value);
    setCargo(baysCounter(inputValue.current.value));
    setInputBoxesValue(value);
  };

  return (
    <Container>
      <InfoContainer>
        <CompanyInfo>
          <CompanyName>{selectedItem.name}</CompanyName>
          <CompanyEmail href={selectedItem.email}>
            {selectedItem.email}
          </CompanyEmail>
        </CompanyInfo>
        <CargoInfo>
          <Cargo>
            Number of required cargo bays <Number>{cargo}</Number>
          </Cargo>
        </CargoInfo>
        <BoxesInfo>
          <Boxes>Cargo boxes:</Boxes>

          <Input
            type="text"
            onChange={handleChange}
            ref={inputValue}
            value={iputInfo || ""}
          ></Input>
        </BoxesInfo>
      </InfoContainer>
    </Container>
  );
};

export default CompanyDetails;
