import React, { useEffect, useState } from "react";
import "./changpasswordmodal.scss";
import TextInput from "../Shared/TextInput/TextInput";
import ElevatedButton from "../Shared/ElevatedButton/ElevatedButton";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import useValidator from "../../hooks/useValidator";
import { changePasswordSchema } from "../../validators/Prodfile";
import { UpdatePassword } from "../../interface/requests/user.request";
import {
  changePassword,
  clearStatusUser,
} from "../../services/redux/slices/user.slice";
import { storageManager } from "../../helper/storager";
import { useSelector } from "react-redux";
import { userSelector } from "../../services/redux/selecters/selector";
type Props = {
  onClose: () => void;
};
const ChangePasswordModal: React.FC<Props> = (props) => {
  const { onClose } = props;
  const dispatch = useAppDispatch();
  const userPayload = useSelector(userSelector);
  const { errors, validate } = useValidator(changePasswordSchema);

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    rePassword: "",
  });

  useEffect(() => {
    if (userPayload.succeed) {
      if (onClose) onClose();
      dispatch(clearStatusUser());
    }
  }, [dispatch, onClose, userPayload.succeed]);

  const handleChangePassword = async () => {
    const result = validate(form);
    if (result) {
      const data: UpdatePassword = {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      };
      await dispatch(
        changePassword({ id: storageManager.getUserId()!, body: data })
      );
    }
  };

  return (
    <div
      className="changePasswordContainer"
      onClick={(e) => {
        if (onClose) onClose();
      }}
    >
      <div className="changePasswordCard" onClick={(e) => e.stopPropagation()}>
        <h3 className="changePasswordTitle">Change your password</h3>
        <hr />
        <div className="changePasswordField">
          <span className="changePasswordFieldKey">Old password</span>
          <span className="changePasswordFieldValue">
            <TextInput
              placeHolderText="Enter old password"
              inputStyle={{ fontSize: 18 }}
              height="40px"
              type="password"
              value={form.oldPassword}
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    oldPassword: e.target.value,
                  };
                });
              }}
              errorMessage={errors.oldPassword}
            />
          </span>
        </div>
        <div className="changePasswordField">
          <span className="changePasswordFieldKey">New password</span>
          <span className="changePasswordFieldValue">
            <TextInput
              placeHolderText="Enter new password"
              inputStyle={{ fontSize: 18 }}
              height="40px"
              type="password"
              value={form.newPassword}
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    newPassword: e.target.value,
                  };
                });
              }}
              errorMessage={errors.newPassword}
            />
          </span>
        </div>
        <div className="changePasswordField">
          <span className="changePasswordFieldKey">Verify password</span>
          <span className="changePasswordFieldValue">
            <TextInput
              placeHolderText="Enter new password again"
              inputStyle={{ fontSize: 18 }}
              height="40px"
              type="password"
              value={form.rePassword}
              onChange={(e) => {
                setForm((prev) => {
                  return {
                    ...prev,
                    rePassword: e.target.value,
                  };
                });
              }}
              errorMessage={errors.rePassword}
            />
          </span>
        </div>
        <div className="changPasswordSubmitButton">
          <ElevatedButton
            text="Change"
            height="40px"
            color="white"
            backgroundColor="black"
            onClick={handleChangePassword}
          />
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
