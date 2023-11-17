import React from "react";
import "./outlinebutton.scss";
import { ColorConstants } from "../../../constants/ColorConstant";
type Props = {
  text: string;
  color?: string;
  height?: string;
  width?: string;
  borderColor?: string;
  backgroundColor?: string;
  onClick?: () => void;
};

const OutLineButton: React.FC<Props> = (props) => {
  const {
    text,
    color = ColorConstants.bluePositive,
    onClick,
    height,
    width,
    borderColor,
    backgroundColor,
  } = props;
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick != null) {
      onClick();
    }
  };

  const style = {
    color: color,
    border: borderColor ? `1px solid ${borderColor}` : `1px solid ${color}`,
    height: height,
    width: width,
    backgroundColor: backgroundColor,
  };

  return (
    <div className="outLineButtonContainer" style={style} onClick={handleClick}>
      <div className="contentOutLineButton">{text}</div>
    </div>
  );
};

export default OutLineButton;
