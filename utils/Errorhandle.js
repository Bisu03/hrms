import { toast } from "react-hot-toast";
export const ErrorHandeling = (error) => {
    console.error(error)
    return toast.error(error?.response?.data?.message)
}