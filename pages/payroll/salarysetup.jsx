import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import apiRequest from '../../utils/apiRequest';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../components/ui/Loader/Loader';
import { SuccessHandling } from '../../utils/SuccessHandle';
import { ErrorHandeling } from '../../utils/Errorhandle';
import { FormateDate, GetDate } from '../../utils/FormateDate';
import Spinner from '../../components/ui/Spinner';
import Link from 'next/link';
import { FaMoneyCheck } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const Salarysetup = () => {
    const [Loading, setLoading] = useState(false)
    const router = useRouter()

    const date = new Date();
    const currentYear = date.getFullYear();

    // Array of months
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Generate an array of years from 1900 to the current year
    const years = Array.from({ length: currentYear - 1900 + 1 }, (v, k) => k + 1900);

    // State for selected year and month
    const [selectedYear, setSelectedYear] = useState(currentYear);
    const [selectedMonth, setSelectedMonth] = useState(monthNames[date.getMonth()]);

    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };


    const {
        isLoading,
        data: GenerateSalary,
        refetch,
    } = useQuery({
        queryKey: ["GenerateSalary"],
        queryFn: () =>
            apiRequest.get(`/api/payroll/generatesalary?salary_mnth=${selectedMonth}&salary_year=${selectedYear}`).then((res) => {
                return res.data;
            }),
    });

    useEffect(() => {
        refetch()
    }, [selectedYear, selectedMonth])

    const HandleGenerateSalary = async () => {
        if (window.confirm('Make Sure everyone salary account was created other wise might face some problem')) {
            setLoading(true)
            try {
                const { data } = await apiRequest.post(`/api/payroll/generatesalary`, {
                    salary_mnth: selectedMonth,
                    salary_year: selectedYear,
                    salary_date: GetDate()
                })
                setLoading(false)
                router.push(`/payroll/employees/${data._id}`)
            } catch (error) {
                setLoading(false)
                ErrorHandeling(error)
            }
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Salary Setup" />

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
                            <input
                                type="number"
                                value={selectedYear}
                                onChange={handleYearChange}
                                min="1900"
                                max={currentYear}
                                className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />

                            <select type="text"
                                value={selectedMonth}
                                onChange={handleMonthChange}
                                className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                list="months">
                                {monthNames.map((month, index) => (
                                    <option key={index} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </select>


                            <button onClick={HandleGenerateSalary} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                {Loading && <Spinner />}  Generate Salary
                            </button>
                        </div>

                    </div>

                </div>

                <div className="max-w-full overflow-x-auto px-5">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Month
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Year
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Date
                                </th>
                                <th className="px-4 py-4 font-medium text-black dark:text-white">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {GenerateSalary?.map((data, key) => (
                                <tr key={key}>

                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {data?.salary_mnth}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {data?.salary_year}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <p className="text-black dark:text-white">
                                            {FormateDate(data?.salary_date)}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            <Link href={`/payroll/employees/${data?._id}`} className="hover:text-primary">
                                                <span className="cursor-pointer bg-blue-100 text-red text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red border border-blue-400">Disbursed Salary</span>
                                            </Link>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    )
}

Salarysetup.adminRoute = true
export default Salarysetup 