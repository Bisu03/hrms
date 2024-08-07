import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import apiRequest from '../../utils/apiRequest';

const AddIncome = ({ Income, setIncome, HandleSubmit }) => {


    const HandleChange = (e) => {
        setIncome({ ...Income, [e.target.name]: e.target.value })
    }

    const {
        isLoading,
        error,
        isError,
        data: IncomeCategory,
        refetch,
    } = useQuery({
        queryKey: ["IncomeCategory"],
        queryFn: () =>
            apiRequest.get(`/api/income/category`).then((res) => {
                return res.data;
            }),
    });

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                     Income
                </h3>
            </div>
            <div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Description
                            </label>
                            <input
                                type="text"
                                name="desc"
                                value={Income.desc}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Category <span className="text-meta-1">*</span>
                            </label>
                            <select
                                name="category"
                                value={Income?.category}
                                required
                                onChange={HandleChange}
                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent px-5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary `}>
                                <option className="text-body dark:text-bodydark">
                                    Select
                                </option>
                                {IncomeCategory?.map((data) => (
                                    <option value={data._id} key={data._id} className="text-body dark:text-bodydark">
                                        {data?.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Amount
                            </label>
                            <input
                                type="tel"
                                name="amount"
                                value={Income.amount}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={Income.date}
                                onChange={HandleChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                    </div>
                    <button onClick={HandleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddIncome