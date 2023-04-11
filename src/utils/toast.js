import { Toaster, toast } from "react-hot-toast";

export const errorToast = (msg) => toast.error(msg);
export const successToast = (msg) => toast.success(msg);
export const pendingToast = (err) =>
  toast.promise(saveSettings(settings), {
    loading: "In progress...",
    success: <b>Done!</b>,
    error: <b>Failed.</b>,
  });

export const Notify = () => {
  return <Toaster position="bottom-center" reverseOrder={false} />;
};
