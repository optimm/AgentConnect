import styled from "styled-components";
import { backgroundGeneral, flexcv } from "./globalStyle";

export const LandingContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: url(${(props) => props.url});
  ${backgroundGeneral}
`;

export const LandingOverlay = styled.div`
  ${flexcv}
  padding: 0% 6%;
  width: 100%;
  height: 100%;
  background: var(--back-drop);
  color: var(--text-white);
  .section-main {
    text-align: center;
    width: fit-content;
  }
  .text-main {
    font-size: clamp(40px, 5vw, 5vw);
  }
  .text-main-span {
    font-weight: 600;
  }
  .text-sub {
    font-size: clamp(20px, 2vw, 2vw);
    font-weight: 400;
    width: 65%;
    margin: 0% auto;
    margin-top: 3%;
  }
  .button-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    margin-top: 5%;
  }
  .button-main {
    height: 55px;
    width: 230px;
  }
`;
