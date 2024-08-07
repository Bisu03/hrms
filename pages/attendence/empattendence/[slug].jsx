import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import apiRequest from '../../../utils/apiRequest';
import { ErrorHandeling } from '../../../utils/Errorhandle';
import DefaultLayout from '../../../components/Layouts/DefaultLayout';
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb';
const Profile = () => {

    const router = useRouter()
    const { slug } = router.query
    const [EmployeeData, setEmployeeData] = useState({})

    const HandlegetEmployee = async () => {
        try {
            const { data } = await apiRequest.get(`/api/attendence/checkattendence/${slug}`)
            setEmployeeData(data)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandlegetEmployee()
    }, [slug])


    return (
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="Attendence Logs" />

                <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-4">
                    <div className="relative z-20 h-35 md:h-65">
                        <Image
                            src={"/images/cover/cover-01.png"}
                            alt="profile cover"
                            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                            width={970}
                            height={260}
                            style={{
                                width: "auto",
                                height: "auto",
                            }}
                        />

                    </div>
                    <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                        <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                            <div className="relative drop-shadow-2">
                                <Image
                                    src={EmployeeData?.employee_id?.profile}
                                    width={160}
                                    height={160}
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}
                                    alt="profile"
                                    className='rounded-full'
                                />

                            </div>
                        </div>

                    </div>
                    <div className="mt-2 w-full justify-center flex">
                        <div className='text-center'>

                            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">

                                <p className="font-medium">{EmployeeData?.employee_id?.employee_id}</p>
                            </h3>
                            <p className="font-medium">{EmployeeData?.employee_id?.employee_first_name} {EmployeeData?.employee_id?.employee_last_name}</p>


                            <div className="mx-auto max-w-180">
                                <h4 className="font-semibold text-black dark:text-white">
                                    Check In Time
                                </h4>
                                <p className="mt-2">
                                    {EmployeeData?.check_in}
                                </p>
                            </div>
                            <div className="mx-auto max-w-180">
                                <h4 className="font-semibold text-black dark:text-white">
                                    Check Out Time
                                </h4>
                                <p className="mt-2">
                                    {EmployeeData?.check_out}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Profile;
