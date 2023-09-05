import styled from "styled-components";
import { flexcv } from "../../styles/globalStyle";

export const FullScreenLoaders = styled.div`
  ${flexcv}
  gap:30px;
  height: 100vh;
  width: 100vw;
  .image {
    height: 35vh;
  }
  .text {
    font-size: 4rem;
    font-weight: 800;
    text-align: center;
    color: var(--text-2);
    font-family: "Zen Dots", cursive;
  }
  span {
    font-size: 6rem;
    color: var(--primary-color);
  }
`;

export const RightPageLoaderWrapper = styled.div`
  height: 100%;
  width: 100%;
  ${flexcv}
`;

export const NoDataWrapper = styled.div`
  ${flexcv}
  height: calc(90vh - 120px);
  width: 100%;
  img {
    height: 180px;
  }
`;

export const ErrorPageWrapper = styled.div`
  ${flexcv}
  height: calc(100vh - 70px);
  gap: 7vh;
  width: 100%;
  img {
    height: 45vh;
  }
  .text {
    font-size: 2rem;
    font-weight: 600;
    color: var(--text-4);
  }
`;
