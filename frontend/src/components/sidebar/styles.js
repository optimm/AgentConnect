import styled from "styled-components";
import { backgroundGeneral, flexch, flexcv } from "../../styles/globalStyle";

export const SideBar = styled.div`
  background: var(--primary-color);
  width: 20vw;
  height: 100vh;
  padding: 50px;
  color: var(--text-white);

  .menu-head {
    margin-top: 80px;
    font-size: 18px;
    color: var(--text-white-light);
  }
  .menu-items {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }
`;

export const SideBarLogo = styled.div`
  color: var(--text-white);
  font-size: 30px;
  font-weight: 600;

  span {
    font-size: 40px;
    font-weight: 600;
  }
`;

export const MenuItemSingle = styled.div`
  color: var(--text-white);
  width: 100%;
  padding: 10px 8px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;

  background: ${(props) => (props.selected ? "var(--glass-morph)" : "inherit")};

  &:hover {
    background: var(--glass-morph);
  }
`;
