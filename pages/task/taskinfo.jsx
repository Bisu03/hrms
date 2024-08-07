import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../components/ui/Breadcrumbs/Breadcrumb";
import { FormateDate, GetDate } from "../../utils/FormateDate";
import apiRequest from "../../utils/apiRequest";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/ui/Loader/Loader";
import HeadwithSearch from "../../components/Layouts/HeadwithSearch";
import Link from "next/link";

const Taskinfo = () => {
    const { data: session } = useSession();

    let curentdate = {
        startdate: GetDate(),
        enddate: GetDate(),
    };
    const [SelectDate, setSelectDate] = useState(curentdate);
    const {
        isLoading,
        error,
        isError,
        data: TaskInfo,
        refetch,
    } = useQuery({
        queryKey: ["TaskInfo"],
        queryFn: () =>
            apiRequest
                .get(
                    `/api/dashboard/tasklist?startdate=${SelectDate.startdate}&enddate=${SelectDate.enddate}&assignto=${session?.user?.empobj_id}`
                )
                .then((res) => {
                    return res.data;
                }),
    });

    useEffect(() => {
        refetch();
    }, [SelectDate]);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Task List" />
            {isLoading && <Loader />}
            <div className="col-span-12 xl:col-span-7">
                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <HeadwithSearch
                        title="Daily Task list"
                        SelectDate={SelectDate}
                        setSelectDate={setSelectDate}
                    />


                    <div className="flex flex-wrap w-full justify-between">
                        {TaskInfo?.map((data, key) => (
                            <div key={key} className={`py-8 px-4  lg:w-1/3  border rounded-lg dark:border-strokedark ${data?.isCompleted ? "dark:bg-green-950" : "dark:bg-boxdark"}  my-2 `}>
                                <div className="h-full flex items-start">
                                    <div className="flex-grow pl-6">
                                        <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                                            {FormateDate(data.date)}
                                        </h2>
                                        <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                                            {" "}
                                            {data.title}
                                        </h1>
                                        <p className="leading-relaxed mb-5">{data.description}</p>
                                        <div className="flex w-full ">
                                            <Link href={`/task/details/${data._id}`} className="text-blue-400 text-xs font-medium me-2 p-2 rounded   border border-blue- flex items-center">
                                                View
                                            </Link>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

Taskinfo.adminRoute = true;
export default Taskinfo;
