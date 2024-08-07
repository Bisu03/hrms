import React from 'react'
import Spinner from '../ui/Spinner'
import apiRequest from '../../utils/apiRequest';
import { useQuery } from '@tanstack/react-query';

const AddExpenceCategory = ({ Name, setName, HandleSubmit, Loading }) => {


    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

            <div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                 Category
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={Name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                    </div>
                    <button onClick={HandleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        {Loading && <Spinner />}   Save
                    </button>
                </div>
            </div>
        </div>
    )

}

export default AddExpenceCategory