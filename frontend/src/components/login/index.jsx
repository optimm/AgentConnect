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
import { useLoginMutation } from "../../app/services/authApi";
import { useFormik } from "formik";
import loginSchema from "./schema";
import { ButtonLoader } from "../loader";
import { createNotification } from "../notification";

const LoginComponent = ({ role }) => {
  const [login, { error: requestError, isError, isLoading }] =
    useLoginMutation();
  const navigate = useNavigate();
  const {
    touched,
    errors,
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        setShowPassword(false);
        const data = await login({ body: values }).unwrap();
        resetForm();
        createNotification(`Welcome ${data?.data?.name}`, "success", 2000);
        navigate(`dashboard/${role}/tickets`);
      } catch (error) {}
    },
  });
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
          <MainCardForm onSubmit={handleSubmit} login>
            <div className="inner">
              <div className="form-head">Login</div>
              <TextField
                name="email"
                label="Email"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && errors.email ? true : false}
                helperText={touched.email && errors.email ? errors.email : null}
              />
              <TextField
                name="password"
                type={showPassword ? "text" : "password"}
                label="Password"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && errors.password ? true : false}
                helperText={
                  touched.password && errors.password ? errors.password : null
                }
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
                disabled={isLoading}
              >
                {isLoading ? <ButtonLoader /> : "Login"}
              </button>
              {isError && (
                <div className="error">{requestError?.data?.msg}</div>
              )}
            </div>
          </MainCardForm>
          <MainCardImage url="/images/login.jpg">
            <MainCardOverLay>
              <div className="heading">Welcome {role}</div>
              <div className="text">
                Login and you can raise any and all queries you want to.
              </div>
              <div className="text">Don&apos;t have an account ?</div>
              <Link to={`/register/${role}`}>
                <button className="card-button">{`Register`}</button>
              </Link>
            </MainCardOverLay>
          </MainCardImage>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default LoginComponent;
