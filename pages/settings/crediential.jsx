import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import apiRequest from "../../utils/apiRequest";
import { SuccessHandling } from "../../utils/SuccessHandle";
import { ErrorHandeling } from "../../utils/Errorhandle";

const Crediential = () => {


    const [Razorpay, setRazorpay] = useState({})

    const HandleChange = (e) => {
        setRazorpay({ ...Razorpay, [e.target.name]: e.target.value })
    }

    const HandlefetchDetails = async () => {
        try {
            const { data } = await apiRequest.get("/api/razorpay/razorpay")
            setRazorpay(data)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandlefetchDetails()
    }, [])


    const HandleSubmit = async () => {
        try {
            const { data } = await apiRequest.post("/api/razorpay/razorpay", {
                ...Razorpay
            })
            SuccessHandling(data.message)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    return (
        <>
            <DefaultLayout>

                <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                                <h3 className="font-medium text-black dark:text-white">
                                    Add Razorpay Crediential
                                </h3>
                            </div>
                            <div>
                                <div className="p-6.5">
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Key ID  <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Key ID"
                                                name="key_id"
                                                value={Razorpay?.key_id}
                                                onChange={HandleChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Key Secret  <span className="text-meta-1">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Key Secret"
                                                name="secret_id"
                                                value={Razorpay?.secret_id}
                                                onChange={HandleChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                        <div className="w-full">
                                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                Account Number <a className="underline text-red" target="_blank" href="https://x.razorpay.com/settings/banking">click here Go to this page copy that id</a>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                placeholder="Past Here"
                                                name="account_number"
                                                value={Razorpay?.account_number}
                                                onChange={HandleChange}
                                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                            />
                                        </div>
                                    </div>
                                    <button
                                        onClick={HandleSubmit}
                                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                        {/* {Loading && <Spinner />}  Save */}
                                        Save
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </DefaultLayout>

        </>
    );
};

Crediential.adminRoute = true
export default Crediential;
