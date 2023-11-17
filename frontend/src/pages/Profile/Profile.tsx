import React, { useEffect, useState } from "react";
import "./profile.scss";
import TextInput from "../../components/Shared/TextInput/TextInput";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { useSelector } from "react-redux";
import { userSelector } from "../../services/redux/selecters/selector";
import { GetUserById } from "../../interface/response/user.response";
import {
  getUserById,
  updateUserById,
} from "../../services/redux/slices/user.slice";
import { storageManager } from "../../helper/storager";
import { UpdateProfile } from "../../interface/requests/user.request";
import useValidator from "../../hooks/useValidator";
import { profileSchema } from "../../validators/Prodfile";
import OutLineButton from "../../components/Shared/OutlineButton/OutLineButton";
import ChangePasswordModal from "../../components/Profile/ChangePasswordModal";
const Profile: React.FC = () => {
  const userId = storageManager.getUserId();
  const dispatch = useAppDispatch();
  const { errors, validate } = useValidator(profileSchema);
  const userPayload = useSelector(userSelector);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [profile, setProfile] = useState<GetUserById | null>(
    userPayload.profile ?? null
  );

  useEffect(() => {
    if (userId) {
      dispatch(getUserById(userId)).then((it) => null);
    }
  }, [dispatch]);

  useEffect(() => {
    if (userPayload.profile) {
      setProfile(userPayload.profile);
    }
  }, [userPayload.profile]);

  const handleUpdateProfile = async () => {
    if (profile) {
      const result = validate(profile);
      if (result) {
        const data: UpdateProfile = {
          firstName: profile?.firstName!,
          lastName: profile?.lastName!,
        };

        dispatch(updateUserById({ id: userId!, body: data }));
      }
    }
  };
  return (
    <>
      <div className="profileContainer">
        {isOpenModal && (
          <ChangePasswordModal onClose={() => setIsOpenModal(false)} />
        )}
        <h3 className="profileHeader">My profile</h3>
        <div className="profileBody">
          <div className="profileCard">
            <div className="profileField">
              <span className="profileFieldKey">User name:</span>
              <span className="profileFieldValue">
                <TextInput
                  width="100%"
                  height="40px"
                  inputStyle={{ fontSize: 18 }}
                  value={profile?.username}
                  readOnly={true}
                  placeHolderText="Enter user name"
                />
              </span>
            </div>
            <div className="profileField">
              <span className="profileFieldKey">First name:</span>
              <span className="profileFieldValue">
                <TextInput
                  width="100%"
                  height="40px"
                  inputStyle={{ fontSize: 18 }}
                  errorMessage={errors.firstName}
                  value={profile?.firstName}
                  onChange={(e) => {
                    setProfile((prev) => {
                      return {
                        ...prev,
                        firstName: e.target.value,
                      } as GetUserById;
                    });
                  }}
                  placeHolderText="Enter first name"
                />
              </span>
            </div>
            <div className="profileField">
              <span className="profileFieldKey">Last name:</span>
              <span className="profileFieldValue">
                <TextInput
                  width="100%"
                  height="40px"
                  inputStyle={{ fontSize: 18 }}
                  errorMessage={errors.lastName}
                  value={profile?.lastName}
                  onChange={(e) => {
                    setProfile((prev) => {
                      return {
                        ...prev,
                        lastName: e.target.value,
                      } as GetUserById;
                    });
                  }}
                  placeHolderText="Enter last name"
                />
              </span>
            </div>
            <div className="profileField">
              <span className="profileFieldKey">Password:</span>
              <span className="profileFieldValue">
                <OutLineButton
                  text="Change password"
                  width="100%"
                  color="black"
                  onClick={() => setIsOpenModal((prev) => !prev)}
                />
              </span>
            </div>
            <div className="profileUpdateButton">
              <ElevatedButton
                onClick={handleUpdateProfile}
                text="Update profile"
                backgroundColor="black"
                color="white"
                height="40px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
