import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../../components/ui/Breadcrumbs/Breadcrumb";
import {
    BiCameraHome,
    BiCircle,
    BiCloset,
    BiCross,
    BiMessage,
} from "react-icons/bi";
import {
    MdAutoDelete,
    MdCamera,
    MdClose,
    MdDelete,
    MdOutlineCameraswitch,
} from "react-icons/md";
import { Bs0CircleFill, BsDoorOpenFill } from "react-icons/bs";
import Image from "next/image";
import apiRequest from "../../../utils/apiRequest";
import { ErrorHandeling } from "../../../utils/Errorhandle";
import { SuccessHandling } from "../../../utils/SuccessHandle";
import { useRouter } from "next/router";
import imageCompression from "browser-image-compression";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/ui/Spinner";
import {
    FormateDate,
    FormattedTime,
    GetDate,
} from "../../../utils/FormateDate";
import Loader from "../../../components/ui/Loader/Loader";

const VerifyTask = () => {
    const router = useRouter();
    const { slug } = router.query;

    const {
        isLoading,
        error,
        isError,
        data: AsignTaskList,
        refetch,
    } = useQuery({
        queryKey: ["AsignTaskList"],
        queryFn: () =>
            apiRequest.get(`/api/task/asigntask?id=${slug}`).then((res) => {
                return res.data;
            }),
    });
    useEffect(() => {
        refetch();
    }, [slug]);



    const HandleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                const { data } = await apiRequest.delete(
                    "/api/task/asigntask?id=" + id
                );
                refetch();
                SuccessHandling(data.message);
            } catch (error) {
                ErrorHandeling(error);
            }
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Task Details" />
            {isLoading && <Loader />}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">Task Info</h3>
                </div>
                {!AsignTaskList?.length > 0 && <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">No Data Found</h3>
                </div>
                }

            </div>

            {AsignTaskList?.map((data, index) => (
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                        <div className="mb-6 mt-2 flex w-full justify-between ">
                            <h3 className="font-medium text-black dark:text-white">
                                Message No. {index + 1}
                            </h3>
                            <button onClick={() => HandleDelete(data._id)} className="btn">
                                {" "}
                                <MdDelete className="h-6 w-8 text-rose-500" />
                            </button>
                        </div>
                        <div className="flex flex-wrap">
                            {data?.url && (
                                <div>
                                    <Image
                                        src={data?.url}
                                        width={100}
                                        height={100}
                                        alt="Captured"
                                        className="rounded-md"
                                    />
                                </div>
                            )}
                            <div className="lg:ml-6 ml-3">
                                <h1 className="text-lg mt-2">Date:- {FormateDate(data.date)}</h1>
                                <h1 className="text-lg mt-2">Time:- {data.time}</h1>
                                <h1 className="text-lg mt-2">Message:- {data.message}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </DefaultLayout>
    );
};

VerifyTask.adminRoute = true;
export default VerifyTask;
