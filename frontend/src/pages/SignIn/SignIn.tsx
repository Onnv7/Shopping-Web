import React, { useEffect, useState } from "react";
import "./signin.scss";
import TextInput from "../../components/Shared/TextInput/TextInput";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import { Link, useNavigate } from "react-router-dom";
import { IRegisterRequest } from "../../interface/requests/auth.request";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import {
  clearAuthSucceedStatus,
  register,
} from "../../services/redux/slices/auth.slice";
import { useSelector } from "react-redux";
import { authSelector } from "../../services/redux/selecters/selector";
import useValidator from "../../hooks/useValidator";
import { registerSchema } from "../../validators/Auth";
import { storageManager } from "../../helper/storager";

const SignIn: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authPayload = useSelector(authSelector);
  const { errors, validate } = useValidator(registerSchema);
  const [registerItem, setRegisterItem] = useState<IRegisterRequest>({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleRegister = async () => {
    const result = validate(registerItem);
    if (result) {
      await dispatch(register(registerItem));
    }
  };

  useEffect(() => {
    if (authPayload.succeed) {
      storageManager.setToken(authPayload.auth?.token!);
      storageManager.setUserId(authPayload.auth?.userId!);
      navigate("/");
      //   dispatch(clearAuthSucceedStatus());
    }
  }, [
    authPayload.auth?.token,
    authPayload.auth?.userId,
    authPayload.succeed,
    dispatch,
    navigate,
  ]);

  return (
    <div className="signInContainer">
      <div className="signInCard">
        <div className="signInBackground">
          <img src="/assets/images/signin.jpg" alt="" />
        </div>
        <div className="signInFormWrap">
          <div className="signInForm">
            <h3 className="signInTitle">Sign in</h3>
            <div className="signInField">
              <div className="signInFieldKey">First name</div>
              <div className="signInFieldValue">
                <TextInput
                  height="40px"
                  placeHolderText="Enter first name"
                  inputStyle={{ fontSize: 20 }}
                  value={registerItem.firstName}
                  onChange={(e) => {
                    setRegisterItem((prev) => {
                      return {
                        ...prev,
                        firstName: e.target.value,
                      };
                    });
                  }}
                  errorMessage={errors.firstName}
                />
              </div>
            </div>
            <div className="signInField">
              <div className="signInFieldKey">Last name</div>
              <div className="signInFieldValue">
                <TextInput
                  height="40px"
                  placeHolderText="Enter last name"
                  inputStyle={{ fontSize: 20 }}
                  value={registerItem.lastName}
                  onChange={(e) => {
                    setRegisterItem((prev) => {
                      return {
                        ...prev,
                        lastName: e.target.value,
                      };
                    });
                  }}
                  errorMessage={errors.lastName}
                />
              </div>
            </div>
            <div className="signInField">
              <div className="signInFieldKey">Username</div>
              <div className="signInFieldValue">
                <TextInput
                  height="40px"
                  placeHolderText="Enter username"
                  inputStyle={{ fontSize: 20 }}
                  value={registerItem.username}
                  onChange={(e) => {
                    setRegisterItem((prev) => {
                      return {
                        ...prev,
                        username: e.target.value,
                      };
                    });
                  }}
                  errorMessage={errors.username}
                />
              </div>
            </div>
            <div className="signInField">
              <div className="signInFieldKey">Password</div>
              <div className="signInFieldValue">
                <TextInput
                  height="40px"
                  placeHolderText="Enter password"
                  inputStyle={{ fontSize: 20 }}
                  value={registerItem.password}
                  onChange={(e) => {
                    setRegisterItem((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    });
                  }}
                  errorMessage={errors.password}
                />
              </div>
            </div>
            <div className="signInSubmitButton" onClick={handleRegister}>
              <ElevatedButton
                text="Register"
                backgroundColor="black"
                color="white"
                height="40px"
                width="300px"
              />
            </div>
            <div className="signInTextLogin">
              You have account?{" "}
              <Link to={"/login"}>Let sign in to website</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
