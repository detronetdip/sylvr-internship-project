import { ToastOptions, toast } from "react-toastify";

export class TOAST {
  static config: ToastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    style: {
      fontSize: "3.4rem",
    },
  };

  static WARN(msg: string) {
    toast.warn(msg, TOAST.config);
  }
  static SUCCESS(msg: string) {
    toast.success(msg, TOAST.config);
  }
  static ERROR(msg: string) {
    toast.error(msg, TOAST.config);
  }
  static INFO(msg: string) {
    toast.info(msg, TOAST.config);
  }
}
