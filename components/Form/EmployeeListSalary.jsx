import React, { useState } from 'react'
import { FormateDate } from '../../utils/FormateDate';
import Link from 'next/link';

const EmployeeListSalary = ({ SalaryEmployee, EmployeeDetails, setEmployeeDetails, }) => {


    const handleSelectEmployee = (employee) => {
        setEmployeeDetails((EmpData) => {
            const exists = EmpData.some((emp) => emp.id === employee._id);
            if (exists) {
                return EmpData.filter((emp) => emp.id !== employee._id);
            } else {
                const newEmployee = {
                    id: employee._id,
                };
                return [...EmpData, newEmployee];
            }
        });
    };

    const handleSelectAll = () => {
        if (EmployeeDetails.length === SalaryEmployee.length) {
            setEmployeeDetails([]);
        } else {
            const allEmployees = SalaryEmployee.map((employee) => ({
                id: employee._id,
            }));
            setEmployeeDetails(allEmployees);
        }
    };

    return (
        <>
            <div className="max-w-full overflow-x-auto px-5">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                <input
                                    type="checkbox"
                                    onChange={handleSelectAll}
                                    checked={EmployeeDetails.length === SalaryEmployee?.length}
                                />
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Employee ID
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Name
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Phone
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Gross Salary
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Salary Date
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Disbursed Status
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Update Salary
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {SalaryEmployee?.map((data, key) => (
                            <tr key={key}>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <input
                                        type="checkbox"
                                        checked={EmployeeDetails.some((emp) => emp.id === data._id)}
                                        onChange={() => handleSelectEmployee(data)}
                                    />
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.employee_id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.employee_first_name}  {data?.employee_last_name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.employee_email}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.contact_id}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.salarytype?.grossSalary} /-
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {FormateDate(data?.salary_date)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <p className="text-black dark:text-white">
                                        {data?.isDisbursed ? <p className='text-green-500'>Salary Paid</p> : <p className='text-red'>Salary Not Disbursed</p>}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <Link href={`/payroll/employees/${data?._id}`} className="hover:text-primary">
                                            <span className="cursor-pointer bg-blue-100 text-red text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red border border-blue-400">Add/Deduct Salary</span>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}


export default EmployeeListSalary