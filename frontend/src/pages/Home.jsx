import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LandingContainer, LandingOverlay } from "../styles/homeStyles";

const Home = () => {
  const navigate = useNavigate();
  return (
    <LandingContainer url="/images/landing.jpg">
      <LandingOverlay>
        <div className="section-main">
          <div className="text-main">
            Welcome To <span className="text-main-span">b</span>ranch
          </div>
          <div className="text-sub">
            Welcome to branch international query portal, Whom do you want to
            continue as?
          </div>
          <div className="button-container">
            <Button
              color="primary"
              variant="contained"
              className="button-main"
              onClick={() => navigate("/login/user")}
            >
              User
            </Button>
            <Button
              color="primary"
              variant="contained"
              className="button-main"
              onClick={() => navigate("/login/agent")}
            >
              Agent
            </Button>
          </div>
        </div>
      </LandingOverlay>
    </LandingContainer>
  );
};

export default Home;
