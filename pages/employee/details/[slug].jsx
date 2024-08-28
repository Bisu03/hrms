import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';

import apiRequest from '../../../utils/apiRequest';
import Loader from '../../../components/ui/Loader/Loader';
import axios from 'axios';

const ProfilePage = () => {

    const router = useRouter()
    const { slug } = router.query

    const [PageLoading, setPageLoading] = useState(false);
    const [EmployeeDetails, setEmployeeDetails] = useState({})


    const HandlegetEmployee = async () => {
        setPageLoading(true);
        try {
            const { data } = await apiRequest.get(`/api/employee/detailspublic/${slug}`);
            setEmployeeDetails(data);
            setPageLoading(false);
        } catch (error) {
            setPageLoading(false);
            ErrorHandeling(error);
        }
    };

    useEffect(() => {
        HandlegetEmployee();
    }, [slug]);

    return (
        <div >

            {PageLoading && <Loader />}

            {EmployeeDetails ? <div className="profile-page">



                <section className="relative block h-[300px]">
                    <div
                        className="absolute top-0 w-full h-full bg-center bg-cover"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
                        }}
                    >
                        <span
                            id="blackOverlay"
                            className="w-full h-full absolute opacity-50 bg-black"
                        ></span>
                    </div>
                    <div
                        className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
                        style={{ transform: 'translateZ(0px)' }}
                    >
                        <svg
                            className="absolute bottom-0 overflow-hidden"
                            xmlns="http://www.w3.org/2000/svg"
                            preserveAspectRatio="none"
                            version="1.1"
                            viewBox="0 0 2560 100"
                            x="0"
                            y="0"
                        >
                            <polygon
                                className="text-blueGray-200 fill-current"
                                points="2560 0 2560 100 0 100"
                            ></polygon>
                        </svg>
                    </div>
                </section>
                <div className="flex z-20 justify-center w-full h-full absolute top-4">
                    <div className="overflow-hidden rounded-full h-36 w-36 border-4 border-stone-100">
                        <Image
                            src={EmployeeDetails?.profile || "/profile.png"}
                            alt="Profile Picture"
                            width={150} // Adjusted width to fit the container
                            height={150} // Adjusted height to fit the container
                            className="object-cover"
                        />
                    </div>
                </div>
                <section className="relative py-16 bg-blueGray-200">
                    <div className="container mx-auto px-4">

                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                            <div className="px-6">
                                <div className="w-full flex flex-wrap justify-center">

                                    <div className="w-full flex lg:justify-end justify-center lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                        <div className="py-6 px-3 mt-10 sm:mt-0">
                                            <button
                                                className=" bg-green-200 uppercase text-black font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded-full outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                            >
                                                <span class="inline-flex items-center justify-center w-6 h-6 me-2 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full dark:bg-gray-700 dark:text-blue-400">
                                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill="currentColor" d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z" />
                                                        <path fill="#fff" d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z" />
                                                    </svg>
                                                    <span class="sr-only">Icon description</span>
                                                </span> Verified
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center mt-12">
                                    <h3 className="text-4xl font-semibold leading-normal text-blueGray-700 mb-2">
                                        {EmployeeDetails?.employee_first_name} {EmployeeDetails?.employee_last_name}
                                    </h3>
                                    <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                                        <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                                        {EmployeeDetails?.department?.name}
                                    </div>
                                    <div className="text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        Gender - {EmployeeDetails?.gender}
                                    </div>
                                    <div className="mb-2 text-blueGray-600 ">
                                        <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                                        Phone Number -  {EmployeeDetails?.phonenumber}
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        Email - {EmployeeDetails?.employee_email}
                                    </div>
                                    <div className="mb-2 text-blueGray-600">
                                        <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                                        Date of Birth - {EmployeeDetails?.date_birth}
                                    </div>
                                </div>
                                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                                    <div className="flex flex-wrap justify-center">
                                        <div className="w-full lg:w-9/12 px-4">
                                            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                                                {EmployeeDetails?.address}
                                            </p>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div> : <h3 className="text-4xl mt-10 text-center  font-semibold leading-normal text-blueGray-700 mb-2">
                Employee Details Not Found
            </h3>}
        </div>

    );
};

export default ProfilePage;
