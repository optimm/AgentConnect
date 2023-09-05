import styled from "styled-components";
import { flexcv } from "./globalStyle";

export const HomeWrapper = styled.div`
  max-height:100vh;
  height: 100vh;
  width: 100vw;
  overflow:hidden;
  ${flexcv}
  gap:50px;

  .home-text {
    font-size: 30px;
    width: 80%;
    margin-auto;
    text-align:center;
  }
  .home-button-section {
    justify-content:center;
    display: flex;
    gap: 100px;
  }

  .home-button{
    width:150px;
    height:50px;
  }

`;
