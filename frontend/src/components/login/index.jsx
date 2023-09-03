import { Link, useNavigate } from "react-router-dom";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainHomeButton,
  MainWrapper,
} from "./styles";
import { AiFillEye, AiFillEyeInvisible, AiFillHome } from "react-icons/ai";

const LoginComponent = ({ role }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <MainWrapper>
        <MainHomeButton>
          <Link to="/">
            <AiFillHome />
          </Link>
        </MainHomeButton>
        <MainCard>
          <MainCardForm login>
            <div className="inner">
              <div className="form-head">Login</div>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                color="secondary"
                className="form-input"
              />
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                color="secondary"
                className="form-input"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onCopy={(e) => {
                  e.preventDefault();
                }}
                onPaste={(e) => {
                  e.preventDefault();
                }}
              />
              <button
                className="form-button"
                type="submit"
                // disabled={isLoading}
              >
                {/* {isLoading ? <ButtonLoader /> : "Login"} */}
              </button>
              {/* {isError && (
                <div className="error">{requestError?.data?.msg}</div>
              )} */}
            </div>
          </MainCardForm>
          <MainCardImage url="/images/login.jpg">
            <MainCardOverLay>
              <div className="heading">Welcome</div>
              <div className="text">
                Login and you can raise any and all queries you want to.
              </div>
              <div className="text">Don&apos;t have an account ?</div>
              <Link to="/register">
                <button className="card-button">{`Register ${role}`}</button>
              </Link>
            </MainCardOverLay>
          </MainCardImage>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default LoginComponent;
