import React, { useEffect, useState } from 'react'
import HeadwithSearch from '../../components/Layouts/HeadwithSearch'
import Loader from '../../components/ui/Loader/Loader'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import { useSession } from 'next-auth/react'
import { GetDate, GetTomorrowDate } from '../../utils/FormateDate'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../utils/apiRequest'
import LeaveRequests from '../../components/Table/LeaveRequests'

const Leaverequest = () => {

    const { data: session } = useSession();

    let curentdate = {
        startdate: GetDate(),
        enddate: GetTomorrowDate()
    }
    const [SelectDate, setSelectDate] = useState(curentdate)

    const {
        isLoading,
        error,
        isError,
        data: LeaveRequest,
        refetch,
    } = useQuery({
        queryKey: ["LeaveRequest"],
        queryFn: () =>
            apiRequest.get(`/api/leave/leave?startdate=${SelectDate.startdate}&enddate=${SelectDate.enddate}`).then((res) => {
                return res.data;
            }),
    });

    useEffect(() => {
        refetch()
    }, [SelectDate])



    return (
        <DefaultLayout>
            <Breadcrumb pageName="Task List" />

            {
                isLoading && <Loader />
            }

            <div className="col-span-12 xl:col-span-7">

                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">

                    <HeadwithSearch title="Leave Request" SelectDate={SelectDate} setSelectDate={setSelectDate} />

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Employee Name
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Resion
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Date
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Number of leaves
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Status
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {LeaveRequest?.map((data) => (
                                    <LeaveRequests data={data} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

Leaverequest.adminRoute = true
export default Leaverequest