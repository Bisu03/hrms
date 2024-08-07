import React from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { SiOpenaccess } from 'react-icons/si';
import Link from 'next/link';

const Access = () => {

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
        <DefaultLayout>
            <Breadcrumb pageName="Manage Page Access" />
            <div className="col-span-12 xl:col-span-7">

                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">


                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Department
                                    </th>
                                    <th className="px-4 py-4 font-medium text-black dark:text-white">
                                        Page Access
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {DepartmentList?.map((data, key) => (
                                    <tr key={key}>

                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <p className="text-black dark:text-white">
                                                {data.name}
                                            </p>
                                        </td>
                                        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                            <div className="flex items-center space-x-3.5">

                                                <Link href={`/settings/permission/${data._id}`} className="hover:text-primary">
                                                    <SiOpenaccess />
                                                </Link>

                                            </div>
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

Access.adminRoute = true
export default Access