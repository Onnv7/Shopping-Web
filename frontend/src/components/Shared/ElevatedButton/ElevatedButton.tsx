import React, { ReactNode } from "react";
import "./elevatedbutton.scss";
import { ColorConstants } from "../../../constants/ColorConstant";

type Props = {
  text: string;
  color?: string;
  backgroundColor?: string;
  height?: string;
  width?: string;
  onClick?: () => void;
  borderRadius?: number;
};

const ElevatedButton: React.FC<Props> = (props) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    if (onClick != null) {
      onClick();
    }
  };
  const {
    text,
    color = ColorConstants.white,
    onClick,
    backgroundColor = ColorConstants.bluePositive,
    height,
    width,
    borderRadius,
  } = props;

  const style = {
    color: color,
    backgroundColor: backgroundColor,
    height: height,
    width: width,
    borderRadius: `${borderRadius}px`,
  };

  return (
    <div className="elevatedBtnContainer" style={style} onClick={handleClick}>
      <div className="contentElevatedButton">{text}</div>
    </div>
  );
};

export default ElevatedButton;
