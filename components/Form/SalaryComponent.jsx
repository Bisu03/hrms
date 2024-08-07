import React, { useEffect } from "react";

const SalaryComponent = ({ SalarySetup, setSalarySetup, SalaryTypes, EmployeeData, HandleSubmitSalary }) => {

    useEffect(() => {
        calculateGrossSalary();
    }, [SalarySetup.additions, SalarySetup.deductions]);

    // Function to handle addition changes
    const handleChangeAdd = (e, salarytype) => {
        const { value } = e.target;
        setSalarySetup((prev) => ({
            ...prev,
            additions: {
                ...prev.additions,
                [salarytype]: parseFloat(value) || 0,
            },
        }));
    };

    // Function to handle deduction changes
    const handleChangeDeduct = (e, salarytype) => {
        const { value } = e.target;
        setSalarySetup((prev) => ({
            ...prev,
            deductions: {
                ...prev.deductions,
                [salarytype]: parseFloat(value) || 0,
            },
        }));
    };

    const calculateGrossSalary = () => {
        const additionTotal = Object.values(SalarySetup?.additions || {}).reduce(
            (acc, val) => acc + val,
            0
        );
        const deductionTotal = Object.values(SalarySetup?.deductions || {}).reduce(
            (acc, val) => acc + val,
            0
        );
        setSalarySetup((prev) => ({
            ...prev,
            grossSalary: prev.baseSalary + additionTotal - deductionTotal
        }));
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Addition</h3>
                        </div>
                        <div>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Base Salary: {EmployeeData?.salary}/-
                                        </label>
                                    </div>
                                </div>
                                {SalaryTypes?.map(
                                    (data, index) =>
                                        data?.benefittype === "Add" && (
                                            <div
                                                key={index}
                                                className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                                <div className="w-full">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        {data?.salarytype} in amount
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name={data?.salarytype}
                                                        value={SalarySetup?.additions?.[data?.salarytype] || ""}
                                                        onChange={(e) => handleChangeAdd(e, data?.salarytype)}
                                                        placeholder="Enter in amount"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">Deduction</h3>
                        </div>
                        <div>
                            <div className="p-6.5">
                                {SalaryTypes?.map(
                                    (data, index) =>
                                        data?.benefittype === "Deduct" && (
                                            <div
                                                key={index}
                                                className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                                <div className="w-full">
                                                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                                        {data?.salarytype} in amount
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name={data?.salarytype}
                                                        value={SalarySetup?.deductions?.[data?.salarytype] || ""}
                                                        onChange={(e) => handleChangeDeduct(e, data?.salarytype)}
                                                        placeholder="Enter in amount"
                                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                    />
                                                </div>
                                            </div>
                                        )
                                )}
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="col-span-12 xl:col-span-7">
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Gross Salary: {SalarySetup?.grossSalary}/-
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={HandleSubmitSalary}
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SalaryComponent;
