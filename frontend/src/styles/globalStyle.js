import styled from "styled-components";
export const flexch = `display:flex; justify-content:center; align-items:center;`;
export const flexcv = `display:flex; flex-direction:column; justify-content:center; align-items:center;`;

export const backgroundGeneral = `background-size: cover; background-position: center;`;

export const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  max-width: 100vw;
  display: flex;
  overflow: hidden;
`;

export const MainWrapperRight = styled.div`
  width: 80vw;
`;

export const FullScreenRight = styled.div`
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
  padding: 50px;
`;

export const ScrollableRight = styled.div`
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px;
`;
