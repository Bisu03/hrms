import React from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import Loader from '../../../components/ui/Loader/Loader'
import { useQuery } from '@tanstack/react-query'
import apiRequest from '../../../utils/apiRequest'
import { useRouter } from 'next/router'
import { FormateDate } from '../../../utils/FormateDate'
import Image from 'next/image'

const AttendenceReport = () => {

    const router = useRouter()
    const { slug } = router.query

    const {
        isLoading,
        error,
        isError,
        data: Employees,
        refetch,
    } = useQuery({
        queryKey: ["Employees"],
        queryFn: () =>
            apiRequest.get(`/api/attendence/attendencereport?qr_code=${slug}`).then((res) => {
                return res.data;
            }),
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Employee List" />

            {
                isLoading && <Loader />
            }

            <div className="col-span-12 xl:col-span-7">

                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="flex w-full justify-between items-center">
                        <div className="px-4 py-6 md:px-6 xl:px-7.5">
                            <h4 className="text-xl font-semibold text-black dark:text-white">
                                Attendence List
                            </h4>
                        </div>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                        Profile
                                    </th>
                                    <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                        Full Name
                                    </th>
                                    <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                        Employee ID
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        In Time
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Out Time
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Employees?.map((data, key) => (
                                    <tr key={key}>

                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <div className="h-12.5 w-15 rounded-md">
                                                <Image
                                                    src={data.employee_id.profile}
                                                    width={60}
                                                    height={50}
                                                    alt="Product"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.employee_id.employee_first_name} {data.employee_id.employee_last_name}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.employee_id.employee_id}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.check_in}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.check_out}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {FormateDate(data.date)}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

AttendenceReport.adminRoute = true
export default AttendenceReport