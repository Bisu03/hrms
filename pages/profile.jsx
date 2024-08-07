import React, { useEffect, useState } from 'react';
import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";
import DefaultLayout from '../components/Layouts/DefaultLayout';
import Breadcrumb from '../components/ui/Breadcrumbs/Breadcrumb';
import { useSession } from 'next-auth/react';
import apiRequest from '../utils/apiRequest';
import { ErrorHandeling } from '../utils/Errorhandle';

const Profile = () => {

    const { data: session } = useSession();
    const [EmployeeData, setEmployeeData] = useState({})

    const HandlegetEmployee = async () => {
        try {
            const { data } = await apiRequest.get(`/api/employee/details/${session?.user?.empobj_id}`)
            setEmployeeData(data)
        } catch (error) {

            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandlegetEmployee()
    }, [session])

    return (
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="Profile" />

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
                                    src={session?.user?.profile}
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

                                <p className="font-medium">{EmployeeData?.employee_id}</p>
                            </h3>
                            <p className="font-medium">{EmployeeData?.employee_first_name} {EmployeeData?.employee_last_name}</p>
                            <div className="w-full flex">
                                <h4 className="font-semibold text-black dark:text-white">
                                    Department:-  {EmployeeData?.department?.name}
                                </h4>
                              
                            </div>

                            <div className="mx-auto max-w-180">
                                <h4 className="font-semibold text-black dark:text-white">
                                    Address
                                </h4>
                                <p >
                                    {EmployeeData?.address}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

Profile.adminRoute = true
export default Profile;
