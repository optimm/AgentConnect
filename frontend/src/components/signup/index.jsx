import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MainCard,
  MainCardForm,
  MainCardImage,
  MainCardOverLay,
  MainHomeButton,
  MainWrapper,
} from "../login/styles";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible, AiFillHome } from "react-icons/ai";
import { useRegisterMutation } from "../../app/services/authApi";
import { useFormik } from "formik";
import registerSchema from "./schema";
import { trimAll } from "../../utils/utilFunctions";
import { createNotification } from "../notification/index";
import { ButtonLoader } from "../loader";

const SignupComponent = ({ role }) => {
  const [register, { error: requestError, isLoading, isError }] =
    useRegisterMutation();
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
      name: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      values = trimAll(values);
      try {
        const data = await register({ body: { ...values, role } }).unwrap();
        resetForm();
        createNotification(data.msg, "success", 2000);
        navigate(`/login/${role}`);
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
          <MainCardImage url="/images/login.jpg">
            <MainCardOverLay>
              <div className="heading">Join Branch International Today</div>
              <div className="text">
                Join branch international query platform
              </div>
              <div className="text">Already have an account ?</div>
              <Link to={`/login/${role}`}>
                <button className="card-button">Login</button>
              </Link>
            </MainCardOverLay>
          </MainCardImage>
          <MainCardForm onSubmit={handleSubmit}>
            <div className="inner">
              <div className="form-head">Register</div>
              <TextField
                name="name"
                label="Name"
                variant="standard"
                color="secondary"
                className="form-input"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && errors.name ? true : false}
                helperText={touched.name && errors.name ? errors.name : null}
              />
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
                {isLoading ? <ButtonLoader /> : "Register"}
              </button>
              {isError && (
                <div className="error">{requestError?.data?.msg}</div>
              )}
            </div>
          </MainCardForm>
        </MainCard>
      </MainWrapper>
    </>
  );
};

export default SignupComponent;
