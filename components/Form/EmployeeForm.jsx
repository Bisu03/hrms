import React from "react";
import { SelectField } from "../../utils/data";
import { useQuery } from "@tanstack/react-query";

import apiRequest from '../../utils/apiRequest'
import Spinner from "../ui/Spinner";

const EmployeeForm = ({ EmployeeData, setEmployeeData, HandleSubmit, Loading }) => {
    const HandleChange = (e) => {
        const { name, value } = e.target;

        if (name.includes('.')) {
            const [parentKey, childKey] = name.split('.');
            setEmployeeData(prevState => ({
                ...prevState,
                [parentKey]: {
                    ...prevState[parentKey],
                    [childKey]: value
                }
            }));
        } else {
            setEmployeeData({ ...EmployeeData, [name]: value });
        }
    };


    const {
        isLoading,
        error,
        isError,
        data: DepartmentList,
        refetch,
    } = useQuery({
        queryKey: ["DepartmentList"],
        queryFn: () =>
            apiRequest.get(`/api/department/department`).then((res) => {
                return res.data;
            }),
    });



    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9">
                {/* <!-- Basic Info --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Basic Info
                        </h3>
                    </div>
                    <div>
                        <div className="p-6.5">
                            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        First name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employee_first_name"
                                        value={EmployeeData?.employee_first_name}
                                        onChange={HandleChange}
                                        placeholder="Enter your first name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>

                                <div className="w-full xl:w-1/2">
                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                        Last name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="employee_last_name"
                                        value={EmployeeData?.employee_last_name}
                                        onChange={HandleChange}
                                        placeholder="Enter your last name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Email <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="employee_email"
                                    value={EmployeeData?.employee_email}
                                    onChange={HandleChange}
                                    placeholder="Enter your email address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Ph No. <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="phonenumber"
                                    value={EmployeeData?.phonenumber}
                                    onChange={HandleChange}
                                    placeholder="Enter your ph no."
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Alternet Ph No.
                                </label>
                                <input
                                    type="email"
                                    name="alternate_number"
                                    value={EmployeeData?.alternate_number}
                                    onChange={HandleChange}
                                    placeholder="Enter your ph no."
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5  ">
                                <label className="mb-2.5 block text-black dark:text-white">Select Gender</label>

                                <div className="relative  bg-transparent dark:bg-form-input">
                                    <select
                                        name="gender"
                                        value={EmployeeData?.gender}
                                        onChange={HandleChange}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}>
                                        <option className="text-body dark:text-bodydark">
                                            Select
                                        </option>
                                        {SelectField.gender?.map((data) => (
                                            <option value={data._id} key={data._id} className="text-body dark:text-bodydark">
                                                {data.name}
                                            </option>
                                        ))}
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

                            <div className="mb-4.5  ">
                                <label className="mb-2.5 block text-black dark:text-white">Select Maratial Status</label>

                                <div className="relative  bg-transparent dark:bg-form-input">
                                    <select
                                        name="maratial_status"
                                        value={EmployeeData?.maratial_status}
                                        onChange={HandleChange}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}>
                                        <option className="text-body dark:text-bodydark">
                                            Select
                                        </option>
                                        {SelectField.maratial?.map((data) => (
                                            <option value={data._id} key={data._id} className="text-body dark:text-bodydark">
                                                {data.name}
                                            </option>
                                        ))}
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


                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Date Of Birth
                                </label>
                                <input
                                    type="date"
                                    placeholder="Enter your ph no."
                                    name="date_birth"
                                    value={EmployeeData?.date_birth}
                                    onChange={HandleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-6">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Address <span className="text-meta-1">*</span>
                                </label>
                                <textarea
                                    rows={6}
                                    name="address"
                                    value={EmployeeData?.address}
                                    onChange={HandleChange}
                                    placeholder="Type your full address"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                            </div>

                            {/* <SelectGroupOne /> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-9">
                {/* <!-- Personal Info --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Personal Info
                        </h3>
                    </div>
                    <div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Hire Date
                                </label>
                                <input
                                    type="date"
                                    name="hiredate"
                                    value={EmployeeData?.hiredate}
                                    onChange={HandleChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5  ">
                                <label className="mb-2.5 block text-black dark:text-white">Select Department <span className="text-meta-1">*</span></label>

                                <div className="relative  bg-transparent dark:bg-form-input">
                                    <select
                                        name="department"
                                        value={EmployeeData?.department}
                                        onChange={HandleChange}
                                        className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}>
                                        <option className="text-body dark:text-bodydark">
                                            Select
                                        </option>
                                        {DepartmentList?.map((data) => (
                                            <option value={data._id} key={data._id} className="text-body dark:text-bodydark">
                                                {data.name}
                                            </option>
                                        ))}
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




                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Aadhar Number
                                </label>
                                <input
                                    type="tel"
                                    name="aadhar"
                                    value={EmployeeData?.aadhar}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Pan Number
                                </label>
                                <input
                                    type="text"
                                    name="pan"
                                    value={EmployeeData?.pan}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Base Salary
                                </label>
                                <input
                                    type="tel"
                                    name="salary"
                                    value={EmployeeData?.salary}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Bank Details
                        </h3>
                    </div>
                    <div>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Bank Name
                                </label>
                                <input
                                    type="text"
                                    name="bankinfo.banknane"
                                    value={EmployeeData?.bankinfo?.banknane}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Account Number
                                </label>
                                <input
                                    type="tel"
                                    name="bankinfo.accountnumber"
                                    value={EmployeeData?.bankinfo?.accountnumber}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    IFSC Code
                                </label>
                                <input
                                    type="text"
                                    name="bankinfo.ifsccode"
                                    value={EmployeeData?.bankinfo?.ifsccode}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Account Holder Name
                                </label>
                                <input
                                    type="text"
                                    name="bankinfo.holdername"
                                    value={EmployeeData?.bankinfo?.holdername}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <button onClick={HandleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                {Loading && <Spinner />} Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;
