import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import { GetDate } from '../../utils/FormateDate'
import Spinner from '../../components/ui/Spinner'
import { SuccessHandling } from '../../utils/SuccessHandle'
import { ErrorHandeling } from '../../utils/Errorhandle'
import apiRequest from '../../utils/apiRequest'
import { useSession } from 'next-auth/react'

const Apply = () => {
    const { data: session } = useSession();
    
    const LeaveState = {
        reason: "",
        date: GetDate(),
        numberofleave: "",
        employee_id: session?.user?.empobj_id
    }
    const [LeaveAplication, setLeaveAplication] = useState(LeaveState)
    const [Loading, setLoading] = useState(false)

    const HandleChange = (e) => {
        setLeaveAplication({ ...LeaveAplication, [e.target.name]: e.target.value })
    }


    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.post("/api/leave/leave", LeaveAplication)
            setLeaveAplication(LeaveState)
            setLoading(false)
            SuccessHandling(data.message)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Leave Application" />

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                <div>
                    <div className="p-6.5">
                        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full ">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Reason
                                </label>
                                <input
                                    type="text"
                                    name="reason"
                                    value={LeaveAplication.reason}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full ">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Applied Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={LeaveAplication.date}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                            <div className="w-full ">
                                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                    Number of leave
                                </label>
                                <input
                                    type="text"
                                    name="numberofleave"
                                    value={LeaveAplication.numberofleave}
                                    onChange={HandleChange}
                                    placeholder="Enter text here"
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                />
                            </div>
                        </div>
                        <button
                            onClick={HandleSubmit}
                            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                            {Loading && <Spinner />}  Submit
                        </button>
                    </div>
                </div>
            </div>

        </DefaultLayout>
    )
}

Apply.adminRoute = true
export default Apply