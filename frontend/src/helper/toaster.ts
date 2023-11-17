import { ToastPosition, toast } from "react-toastify";

type ToastProp = {
  text: string;
  position?: string;
  autoClose?: number;
  closeOnClick?: boolean;
};
export const toaster = {
  success: (props: ToastProp) => {
    const {
      text,
      position = "top-center",
      autoClose = 5000,
      closeOnClick = true,
    } = props;

    toast.success(text, {
      position: position as ToastPosition,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: closeOnClick,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
  error: (props: ToastProp) => {
    const {
      text,
      position = "bottom-left",
      autoClose = 5000,
      closeOnClick = true,
    } = props;
    toast.error(text, {
      position: position as ToastPosition,
      autoClose: autoClose,
      hideProgressBar: false,
      closeOnClick: closeOnClick,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  },
};
