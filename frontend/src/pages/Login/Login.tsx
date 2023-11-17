import React, { useEffect, useState } from "react";
import "./login.scss";
import TextInput from "../../components/Shared/TextInput/TextInput";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import { ToastContainer, toast } from "react-toastify";
import { ILoginRequest } from "../../interface/requests/auth.request";
import { loginSchema } from "../../validators/Auth";
import useValidator from "../../hooks/useValidator";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { login } from "../../services/redux/slices/auth.slice";
import useAuth from "../../hooks/useAuth";
import { storageManager } from "../../helper/storager";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authSelector } from "../../services/redux/selecters/selector";

const Login: React.FC = () => {
  const initialLogin = {
    username: "",
    password: "",
  } as ILoginRequest;
  const dispatch = useAppDispatch();
  const authPayload = useSelector(authSelector);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [credential, setCredential] = useState(initialLogin);

  const { errors, validate } = useValidator(loginSchema);

  // event handlers =================================
  const handleLogin = async () => {
    const result = validate(credential);
    if (result) {
      await dispatch(login(credential));
    }
  };

  useEffect(() => {
    // TH chặn login rồi => Home
    if (storageManager.getToken()) {
      navigate("/");
    } // TH login thành công
    else if (authPayload.succeed && authPayload.auth) {
      console.log("object");
      const data = authPayload.auth;
      setAuth({
        userId: data.userId,
        accessToken: data.token,
      });
      storageManager.setUserId(data.userId!);
      storageManager.setToken(data.token!);

      navigate("/");
    }
  }, [authPayload.auth, authPayload.succeed, navigate, setAuth]);
  return (
    <div className="loginContainer">
      <div className="loginCard">
        <div className="loginImage">
          <img src="/assets/images/login.jpg" alt="" />
        </div>
        <div className="loginForm">
          <div className="loginFormCard">
            <div className="loginFormCardTitle">Login to website</div>
            <div className="loginFormField">
              <div className="loginFormFieldKey">Username</div>
              <div className="loginFormCardTextInput">
                <TextInput
                  placeHolderText="Username"
                  width="500px"
                  height="44px"
                  inputStyle={{ fontSize: 20 }}
                  value={credential.username}
                  onChange={(e) =>
                    setCredential((prev) => {
                      return {
                        ...prev,
                        username: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>
            <div className="loginFormField">
              <div className="loginFormFieldKey">Password</div>
              <div className="loginFormCardTextInput">
                <TextInput
                  type="password"
                  placeHolderText="Password"
                  width="500px"
                  inputStyle={{ fontSize: 20 }}
                  height="44px"
                  value={credential.password}
                  onChange={(e) =>
                    setCredential((prev) => {
                      return {
                        ...prev,
                        password: e.target.value,
                      };
                    })
                  }
                />
              </div>
            </div>

            <div className="loginFormCardButton" onClick={handleLogin}>
              <ElevatedButton
                text="Login"
                backgroundColor="black"
                color="white"
                width="260px"
              />
            </div>
            <div className="loginFormTextRegister">
              You don't have account?{" "}
              <Link to={"/register"}>Let register new account</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
