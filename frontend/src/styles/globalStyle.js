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
  height: 100vh;
  width: 80vw;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 50px;
`;
