import React from "react";
import { ErrorHandeling } from "../../utils/Errorhandle";
import { SuccessHandling } from "../../utils/SuccessHandle";
import Spinner from "../ui/Spinner";

const Addusers = ({ UserInfo, setUserInfo, HandleSubmit, Loading }) => {

    const HandleChange = (e) => {
        setUserInfo({ ...UserInfo, [e.target.name]: e.target.value })
    }

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Add User
                </h3>
            </div>
            <div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                User Name
                            </label>
                            <input
                                type="text"
                                name="employee_name"
                                value={UserInfo.employee_name}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Email
                            </label>
                            <input
                                type="text"
                                name="employee_email"
                                value={UserInfo.employee_email}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Phone Number
                            </label>
                            <input
                                type="text"
                                name="phonenumber"
                                value={UserInfo.phonenumber}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Select Role <span className="text-meta-1">*</span>
                            </label>

                            <div className="relative  bg-transparent dark:bg-form-input">
                                <select
                                    name="role"
                                    value={UserInfo.role}
                                    onChange={HandleChange}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}>
                                    <option className="text-body dark:text-bodydark">
                                        Select
                                    </option>
                                    <option
                                        value="Admin"
                                        className="text-body dark:text-bodydark">
                                        Admin
                                    </option>
                                </select>

                                <span className="absolute right-4 top-1/2 -translate-y-1/2">
                                    <svg
                                        className="fill-current"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill=""></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={HandleSubmit}
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        {Loading && <Spinner />}  Save
                    </button>
                </div>
            </div>
        </div>
    );
};

Addusers.adminRoute = true
export default Addusers;
