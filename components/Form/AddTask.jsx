import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Spinner from "../ui/Spinner";
import Loader from "../ui/Loader/Loader";
import { ErrorHandeling } from "../../utils/Errorhandle";
import { GetDate } from "../../utils/FormateDate";
import toast from "react-hot-toast";

const AddTask = ({ TaskData, setTaskData, HandleSubmit, Loading }) => {
    const HandleChange = (e) => {
        setTaskData({ ...TaskData, [e.target.name]: e.target.value });
    };

    const [EmployeeList, setEmployeeList] = useState()
    const [DepartmentId, setDepartmentId] = useState("");


    const { data: DepartmentList } = useQuery({
        queryKey: ["DepartmentList"],
        queryFn: () =>
            apiRequest.get(`/api/department/department`).then((res) => {
                return res.data;
            }),
    });


    const HandleFetchEmployee = async () => {
        try {
            const { data } = await apiRequest.get(`/api/department/getemployee/${DepartmentId}`)
            setEmployeeList(data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        HandleFetchEmployee();
    }, [DepartmentId]);


    const [startDate, setStartDate] = useState(GetDate());
    const [endDate, setEndDate] = useState(GetDate());

    const handleGenerateDates = () => {
        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates.");
            return;
        }

        const start = new Date(startDate);
        const end = new Date(endDate);
        const dates = [];

        if (start > end) {
            toast.error("Start date cannot be after end date.");
            return;
        }

        // Check if the start and end dates are the same
        if (start.getTime() === end.getTime()) {
            dates.push(start.toISOString().split('T')[0]); // Store in YYYY-MM-DD format
        } else {
            while (start <= end) {
                dates.push(new Date(start).toISOString().split('T')[0]); // Store in YYYY-MM-DD format
                start.setDate(start.getDate() + 1);
            }
        }

        setTaskData(prevTaskData => ({
            ...prevTaskData,
            date: dates
        }));
    };

    useEffect(() => {
        handleGenerateDates()
    }, [startDate, endDate])


    const handleSelectEmployee = (employeeId) => {
        setTaskData(prevTaskData => ({
            ...prevTaskData,
            assignto: prevTaskData.assignto.includes(employeeId)
                ? prevTaskData.assignto.filter(id => id !== employeeId)
                : [...prevTaskData.assignto, employeeId]
        }));
    };

    const handleSelectAll = () => {
        if (TaskData.assignto.length === EmployeeList?.length) {
            setTaskData(prevTaskData => ({
                ...prevTaskData,
                assignto: []
            }));
        } else {
            setTaskData(prevTaskData => ({
                ...prevTaskData,
                assignto: EmployeeList?.map(employee => employee._id)
            }));
        }
    };


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Asign Task</h3>
            </div>
            <div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Title  <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={TaskData?.title}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Description  <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="text"
                                name="description"
                                value={TaskData?.description}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        {/* <button onClick={HandleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        Save
                        </button> */}
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-2.5 block text-black dark:text-white">
                                Select Department <span className="text-meta-1">*</span>
                            </label>

                            <div className="relative  bg-transparent dark:bg-form-input">
                                <select
                                    name="DepartmentId"
                                    value={DepartmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}>
                                    <option className="text-body dark:text-bodydark">
                                        Select
                                    </option>
                                    {DepartmentList?.map((data) => (
                                        <option
                                            value={data._id}
                                            key={data._id}
                                            className="text-body dark:text-bodydark">
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

                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Starting  Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Ending  Date
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                    </div>

                    <button
                        onClick={HandleSubmit}
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        {Loading && <Spinner />} Save
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
                                            checked={TaskData?.assignto?.length === EmployeeList?.length}
                                        />
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Employee ID</th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Full Name</th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {EmployeeList?.map((data) => (
                                    <tr key={data._id}>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <input
                                                type="checkbox"
                                                checked={TaskData.assignto.includes(data?._id)}
                                                onChange={() => handleSelectEmployee(data?._id)}
                                            />
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {data.employee_id}
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {" "}
                                            {data?.employee_first_name} {data?.employee_last_name}
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            {data.employee_email}
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

export default AddTask;
