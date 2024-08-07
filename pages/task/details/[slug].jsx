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

const TaskDetails = () => {
    const router = useRouter();
    const { slug } = router.query;

    const webcamRef = useRef();
    const [facingMode, setFacingMode] = useState("user");
    const [imageSrc, setImageSrc] = useState("");
    const [OpenCamera, setOpenCamera] = useState(false);
    const [Loading, setLoading] = useState(false);

    const [CurrentTime, setCurrentTime] = useState(FormattedTime())

    setInterval(() => {
        setCurrentTime(FormattedTime())
    }, 1000);

    const TaskState = {
        url: "",
        message: "",
    };
    const [TaskMessage, setTaskMessage] = useState(TaskState);
    const [IsCompressing, setIsCompressing] = useState(false);

    const videoConstraints = {
        facingMode: facingMode,
    };

    const switchCamera = () => {
        setFacingMode((prevFacingMode) =>
            prevFacingMode === "user" ? "environment" : "user"
        );
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImageSrc(imageSrc);
        const blob = base64ToBlob(imageSrc, "image/jpeg");
        handleFileInput(blob);
        setOpenCamera(!OpenCamera);
    };

    const base64ToBlob = (base64, mime) => {
        const byteString = atob(base64.split(",")[1]);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mime });
    };

    const handleFileInput = async (file) => {
        setIsCompressing(true);
        try {
            const compressedBlob = await compressImage(file);
            if (compressedBlob) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setIsCompressing(false);
                    setTaskMessage({ ...TaskMessage, url: reader.result });
                };
                reader.readAsDataURL(compressedBlob);
            }
        } catch (error) {
            console.error("Error compressing image:", error);
            setIsCompressing(false);
        }
    };

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 1, // Maximum size in MB
            maxWidthOrHeight: 800, // Maximum width or height
            useWebWorker: true, // Use web worker for better performance
        };
        try {
            const compressedFile = await imageCompression(file, options);
            return compressedFile;
        } catch (error) {
            console.error("Error during image compression:", error);
        }
    };

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

    const HandleChange = (e) => {
        setTaskMessage({ ...TaskMessage, [e.target.name]: e.target.value });
    };


    const HandleAddMessage = async () => {
        setLoading(true);
        try {
            const { data } = await apiRequest.post("/api/task/asigntask", {
                ...TaskMessage,
                taskid: slug,
                time: CurrentTime,
                date: GetDate(),
            });
            setTaskMessage(TaskState);
            setImageSrc(null);
            location.reload()
            setLoading(false);
            SuccessHandling(data.message);
        } catch (error) {
            setLoading(false);
            ErrorHandeling(error);
        }
    };

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


    const HandleUpdateTask = async () => {
        if (window.confirm('Are you sure you?')) {
            try {
                const { data } = await apiRequest.put("/api/task/task?id=" + slug, {
                    isCompleted: true
                })
                router.push("/")
                SuccessHandling(data.message)
            } catch (error) {
                ErrorHandeling(error)
            }
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Task Details" />

            {isLoading && <Loader />}

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark flex items-center justify-between">
                    <h3 className="font-medium text-black dark:text-white text-center">Task Info</h3>
                    <button
                        onClick={HandleUpdateTask}
                        className="flex w-44 items-center mt-4 justify-center rounded-full bg-green-600 p-3 font-medium text-gray hover:bg-opacity-90">
                        Mark As Done
                    </button>
                </div>

                {imageSrc && (
                    <div className="p-2">
                        <div className="absolute right-6">
                            <MdDelete
                                className="text-rose-900 h-6 w-6"
                                onClick={() => setImageSrc(null)}
                            />
                        </div>
                        <Image
                            src={imageSrc}
                            width={720}
                            height={1080}
                            alt="Captured"
                            className="rounded-md "
                        />
                    </div>
                )}

                {OpenCamera && (
                    <div className="fixed w-screen h-screen bg-black-2 top-0 right-0 left-0 p-3 ">
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            videoConstraints={videoConstraints}
                            className="w-full h-[70vh] rounded-md"
                        />
                        <div className="flex w-full justify-between p-4 mt-10 items-center ">
                            <MdOutlineCameraswitch
                                onClick={switchCamera}
                                className="h-8 w-8 text-white"
                            />
                            <BiCircle onClick={capture} className="h-12 w-12 text-white" />
                            <MdClose
                                onClick={() => setOpenCamera(!OpenCamera)}
                                className="h-8 w-8 text-white"
                            />
                        </div>
                    </div>
                )}

                <div className="col-span-12 xl:col-span-7">
                    <div className="p-6.5">


                        <div className="mb-6 mt-2">
                            <div className="flex w-full justify-between  items-center mb-3 ">
                                <label className=" block text-sm font-medium text-black dark:text-white">
                                    Camera
                                </label>
                                <button
                                    onClick={() => setOpenCamera(!OpenCamera)}
                                    className="flex w-44 items-center mt-4 justify-center rounded-full bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    {OpenCamera ? (
                                        <>
                                            {" "}
                                            Close Camera
                                        </>
                                    ) : (
                                        <>
                                            {" "}
                                            <MdCamera className="h-6 w-6" />
                                        </>
                                    )}
                                </button>

                            </div>
                            <textarea
                                rows={6}
                                name="message"
                                value={TaskMessage.message}
                                onChange={HandleChange}
                                placeholder="Type Message Here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"></textarea>
                        </div>
                        {IsCompressing ? (
                            <button className="flex w-full items-center mt-4  justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                processing image.....
                            </button>
                        ) : (
                            <button
                                onClick={HandleAddMessage}
                                className="flex w-full items-center mt-4  justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                {Loading && <Spinner />} <BiMessage className=" h-6 w-6" /> Add
                                Message & Image
                            </button>
                        )}
                    </div>
                </div>
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

TaskDetails.adminRoute = true;
export default TaskDetails;
