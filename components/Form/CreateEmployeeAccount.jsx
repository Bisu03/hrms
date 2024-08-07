import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Spinner from "../ui/Spinner";
import Loader from "../ui/Loader/Loader";
import { ErrorHandeling } from "../../utils/Errorhandle";
import { GetDate } from "../../utils/FormateDate";
import toast from "react-hot-toast";

const CreateEmployeeAccount = ({ EmployeeDetails, setEmployeeDetails, Loading, HandleSubmit }) => {
    const [EmployeeList, setEmployeeList] = useState([]);
    const [DepartmentId, setDepartmentId] = useState("");

    const { data: DepartmentList } = useQuery({
        queryKey: ["DepartmentList"],
        queryFn: () =>
            apiRequest.get(`/api/department/department`).then((res) => res.data),
    });

    const HandleFetchEmployee = async () => {
        try {
            const { data } = await apiRequest.get(`/api/department/getemployee/${DepartmentId}`);
            setEmployeeList(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (DepartmentId) {
            HandleFetchEmployee();
        }
    }, [DepartmentId]);

    const handleSelectEmployee = (employee) => {
        setEmployeeDetails((EmpData) => {
            const exists = EmpData.some((emp) => emp.id === employee._id);
            if (exists) {
                return EmpData.filter((emp) => emp.id !== employee._id);
            } else {
                const newEmployee = {
                    id: employee._id,
                    name: `${employee.employee_first_name} ${employee.employee_last_name}`,
                    contact: employee.phonenumber,
                    email: employee.employee_email,
                    bankinfo: employee.bankinfo,

                };
                return [...EmpData, newEmployee];
            }
        });
    };

    const handleSelectAll = () => {
        if (EmployeeDetails.length === EmployeeList.length) {
            setEmployeeDetails([]);
        } else {
            const allEmployees = EmployeeList.map((employee) => ({
                id: employee._id,
                name: `${employee.employee_first_name} ${employee.employee_last_name}`,
                contact: employee.phonenumber,
                email: employee.employee_email,
                bankinfo: employee.bankinfo,
            }));
            setEmployeeDetails(allEmployees);
        }
    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Select Department & Employee to create salary account
                </h3>
            </div>
            <div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Select Department <span className="text-meta-1">*</span>
                            </label>
                            <div className="relative bg-transparent dark:bg-form-input">
                                <select
                                    name="DepartmentId"
                                    value={DepartmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                                >
                                    <option value="">Select</option>
                                    {DepartmentList?.map((data) => (
                                        <option
                                            value={data._id}
                                            key={data._id}
                                            className="text-body dark:text-bodydark"
                                        >
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
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g opacity="0.8">
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                fill=""
                                            ></path>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={HandleSubmit}
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >

                        {Loading && <Spinner />}  Create Account
                    </button>
                    <h2 className="mt-10 mb-4">Employee List</h2>
                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        <input
                                            type="checkbox"
                                            onChange={handleSelectAll}
                                            checked={EmployeeDetails.length === EmployeeList.length}
                                        />
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Employee ID</th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Full Name</th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Salary Account Created</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EmployeeList.map((data) => (
                                    <tr key={data._id}>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <input
                                                type="checkbox"
                                                checked={EmployeeDetails.some((emp) => emp.id === data._id)}
                                                onChange={() => handleSelectEmployee(data)}
                                            />
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {data.employee_id}
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {data.employee_first_name} {data.employee_last_name}
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {data.employee_email}
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {data.isSalaryAccountCreate ? <p className="text-green-500"> Account Created </p> : <p className="text-red"> Not Created </p>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEmployeeAccount;
