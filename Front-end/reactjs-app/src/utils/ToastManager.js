import { toast } from "react-toastify";

const TOAST_POSITION = "top-right";
const TOAST_TIMER = 5000;

export function toastSuccess(message) {
  console.log("toastSuccess", message);
  toast.success(message, {
    position: TOAST_POSITION,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export function toastError(message) {
  console.log("toastError", message);
  toast.error(message, {
    position: TOAST_POSITION,
    autoClose: TOAST_TIMER,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}

export default function ToastManager() {}
