import React, { useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import { useRouter } from 'next/router'
import apiRequest from '../../../utils/apiRequest'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { FormateDate } from '../../../utils/FormateDate'
import Loader from '../../../components/ui/Loader/Loader'
import EmployeeListSalary from '../../../components/Form/EmployeeListSalary'
import { SuccessHandling } from '../../../utils/SuccessHandle'
import { ErrorHandeling } from '../../../utils/Errorhandle'
import Spinner from '../../../components/ui/Spinner'

const EmployeesSalary = () => {
    const router = useRouter()
    const { slug } = router.query
    const [EmployeeDetails, setEmployeeDetails] = useState([])
    const [Loading, setLoading] = useState(false)

    const {
        isLoading,
        data: SalaryEmployee,
        refetch,
    } = useQuery({
        queryKey: ["SalaryEmployee"],
        queryFn: () =>
            apiRequest.get(`/api/payroll/salarydisbursed/${slug}`).then((res) => {
                return res.data;
            }),
    });

    const HandleDisbursed = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.put(`/api/payroll/salarydisbursed/${slug}`, EmployeeDetails)
            setLoading(false)
            refetch()
            SuccessHandling(data.message)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }

    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Salary Disbursed" />
                {isLoading && <Loader />}

                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="flex w-full justify-between ">
                        <div className="px-4 py-6 md:px-6 xl:px-7.5">
                            <h4 className="text-xl font-semibold text-black dark:text-white">
                                Salary Disbursed
                            </h4>
                        </div>
                        <div className="px-4 py-6 md:px-6 xl:px-7.5 ">
                            <div className='flex'>
                                <button onClick={HandleDisbursed} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    {Loading && <Spinner />}     Disbursed Salary
                                </button>
                            </div>
                        </div>

                    </div>

                    <EmployeeListSalary SalaryEmployee={SalaryEmployee} EmployeeDetails={EmployeeDetails} setEmployeeDetails={setEmployeeDetails} />
                </div>
            </DefaultLayout>
        </>
    )
}

EmployeesSalary.adminRoute = true
export default EmployeesSalary