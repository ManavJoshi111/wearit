import { toast } from "react-toastify";

export const SuccessToast = (msg: any) => {
  return toast.success(msg.message, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    icon: () => "🚀",
  });
};

export const ErrorToast = (msg: any) => {
  console.log("Msg in error: ", msg);
  toast.error(msg.error, {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    icon: () => "🚨",
  });
};
