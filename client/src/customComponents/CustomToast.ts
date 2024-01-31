import { toast } from "react-toastify";

export const SuccessToast = (msg: any) => {
  return toast.success(msg.message, {
    position: "top-center",
    autoClose: 500,
    hideProgressBar: true,
    icon: () => "🚀",
  });
};

export const ErrorToast = (msg: any) => {
  console.log("Msg in error: ", msg);
  toast.error(msg.error, {
    position: "top-center",
    autoClose: 500,
    pauseOnHover: false,
    hideProgressBar: true,
    icon: () => "🚨",
  });
};
