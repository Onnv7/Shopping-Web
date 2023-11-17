import React from "react";
import "./controlnumberpanel.scss";

type Props = {
  value: number;
  onIncreaseValue?: (value: number) => void;
  onDecreaseValue?: (value: number) => void;
};

const ControlNumberPanel: React.FC<Props> = (props) => {
  const { value, onIncreaseValue, onDecreaseValue } = props;

  const handleIncrease = () => {
    if (onIncreaseValue) {
      onIncreaseValue(value);
    }
  };
  const handleDecrease = () => {
    if (onDecreaseValue) {
      onDecreaseValue(value);
    }
  };
  return (
    <div className="controlNumberContainer">
      <span className="controlNumberDecrease" onClick={handleDecrease}>
        -
      </span>
      <span className="controlNumberValue">{value}</span>
      <span className="controlNumberIncrease" onClick={handleIncrease}>
        +
      </span>
    </div>
  );
};

export default ControlNumberPanel;
