import React from "react";
import { HomeWrapper } from "../styles/homeStyles";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <HomeWrapper>
      <div className="home-text">
        Welcome to branch international query portal, Whom do you want to
        continue as?
      </div>
      <div className="home-button-section">
        <Button
          color="primary"
          variant="contained"
          className="home-button"
          onClick={() => navigate("/login/user")}
        >
          User
        </Button>
        <Button
          color="primary"
          variant="contained"
          className="home-button"
          onClick={() => navigate("/login/agent")}
        >
          Agent
        </Button>
      </div>
    </HomeWrapper>
  );
};

export default Home;
