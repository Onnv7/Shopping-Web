import React, { CSSProperties, memo } from "react";
import "./textinput.scss";

type Props = {
  height?: string;
  width?: string;
  placeHolderText?: string;
  type?: string;
  value?: string;
  errorMessage?: string;
  onChange?: (e: any) => void;
  readOnly?: boolean;
  inputStyle?: CSSProperties;
};

const TextInput: React.FC<Props> = (props) => {
  const {
    height = 30,
    width,
    placeHolderText,
    type = "text",
    value,
    onChange,
    errorMessage,
    readOnly,
    inputStyle,
    ...inputProps
  } = props;

  const style = {
    height: height,
    width: width ?? "100%",
  };

  return (
    <div className="textInputContainer" style={style}>
      <input
        type={type}
        className="textInput"
        placeholder={placeHolderText}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        {...inputProps}
        style={inputStyle}
      />
      {errorMessage?.length! > 0 ? (
        <div className="textInputErrorMessage">{`*${errorMessage}`}</div>
      ) : (
        <div className="textInputErrorMessage"></div>
      )}
    </div>
  );
};

export default memo(TextInput);
