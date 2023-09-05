import React from "react";
import { HomeWrapper } from "../styles/homeStyles";
import { Button } from "@mui/material";

const Home = () => {
  return (
    <HomeWrapper>
      <div className="home-text">
        Welcome to branch international query portal, Whom do you want to
        continue as?
      </div>
      <div className="home-button-section">
        <Button color="primary" variant="contained" className="home-button">
          User
        </Button>
        <Button color="primary" variant="contained" className="home-button">
          Agent
        </Button>
      </div>
    </HomeWrapper>
  );
};

export default Home;
