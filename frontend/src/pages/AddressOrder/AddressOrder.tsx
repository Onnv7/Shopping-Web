import React, { useEffect, useState } from "react";
import TextInput from "../../components/Shared/TextInput/TextInput";
import ElevatedButton from "../../components/Shared/ElevatedButton/ElevatedButton";
import "./addressorder.scss";
import CartBill from "../../components/Cart/CartBill/CartBill";
import TextArea from "../../components/Shared/TextArea/TextArea";
import { Link, useNavigate } from "react-router-dom";
import { IDeliveringInfo } from "../../interface/models/cart.model";
import { useAppDispatch } from "../../services/redux/useTypedSelector";
import { updateDeliveringInfo } from "../../services/redux/slices/cart.slice";
import { useSelector } from "react-redux";
import { cartSelector } from "../../services/redux/selecters/selector";
import useValidator from "../../hooks/useValidator";
import { deliveringSchema } from "../../validators/Cart";

const AddressOrder: React.FC = () => {
  const initialItem = {
    address: "",
    phoneNumber: "",
    note: "",
  } as IDeliveringInfo;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [delivering, setDelivering] = useState(initialItem);
  const cartPayload = useSelector(cartSelector);
  const { errors, validate } = useValidator(deliveringSchema);

  useEffect(() => {
    if (!cartPayload.items || cartPayload.items.length === 0) {
      navigate("/cart");
    }
  }, [cartPayload.items, navigate]);
  // event handlers =================================================================
  const handleNext = () => {
    const result = validate(delivering);
    if (result) {
      dispatch(updateDeliveringInfo(delivering));
      navigate("/order");
    }
  };
  return (
    <div className="addressOrderContainer">
      <h3 className="addressOrderHeader">Shipping information</h3>
      <div className="addressOrderWrap">
        <div className="addressOrderInfo">
          <form className="addressOrderForm">
            <span className="addressOrderField addressOrderFieldAddress">
              <div className="addressOrderTitle">Address</div>
              <div className="addressOrderInput">
                <TextInput
                  height="48px"
                  inputStyle={{ fontSize: 18 }}
                  value={delivering.address}
                  onChange={(e) => {
                    setDelivering((prev) => {
                      return {
                        ...prev,
                        address: e.target.value,
                      };
                    });
                  }}
                  errorMessage={errors.address}
                />
              </div>
            </span>
            <span className="addressOrderField addressOrderFieldPhoneNumber">
              <div className="addressOrderTitle">Phone number</div>
              <div className="addressOrderInput addressOrderPhoneNumber">
                <TextInput
                  height="48px"
                  inputStyle={{ fontSize: 18 }}
                  value={delivering.phoneNumber}
                  onChange={(e) => {
                    setDelivering((prev) => {
                      return {
                        ...prev,
                        phoneNumber: e.target.value,
                      };
                    });
                  }}
                  errorMessage={errors.phoneNumber}
                />
              </div>
            </span>
            <span className="addressOrderField addressOrderFieldPhoneNumber">
              <div className="addressOrderTitle">Note</div>
              <div className="addressOrderInput addressOrderNote">
                <TextArea
                  height="300px"
                  inputStyle={{ fontSize: 18 }}
                  value={delivering.note}
                  onChange={(e) => {
                    setDelivering((prev) => {
                      return {
                        ...prev,
                        note: e.target.value,
                      };
                    });
                  }}
                />
              </div>
            </span>
          </form>
          <div className="addressOrderButtons ">
            <ElevatedButton
              text="Next"
              color="white"
              backgroundColor="black"
              width="300px"
              onClick={handleNext}
            />
          </div>
        </div>
        <div className="addressOrderBill">
          <CartBill />
        </div>
      </div>
    </div>
  );
};

export default AddressOrder;
