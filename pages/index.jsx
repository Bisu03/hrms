import React, { useEffect, useState } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Breadcrumb from "../components/ui/Breadcrumbs/Breadcrumb";
import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";
import { FormateDate, GetDate } from "../utils/FormateDate";
import { MdFiberNew } from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Noticelist from "../components/Table/Noticelist";

const Home = () => {
  const { data: session } = useSession();


  const targetDate = new Date("2024-07-19");
  const today = new Date();
  const timeDifference = targetDate.getTime() - today.getTime();
  const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

  const {
    data: NoticeList,
  } = useQuery({
    queryKey: ["NoticeList"],
    queryFn: () =>
      apiRequest.get(`/api/notice/getnotice`).then((res) => {
        return res.data;
      }),
  });



  let curentdate = {
    startdate: GetDate(),
    enddate: GetDate()
  }
  const [SelectDate, setSelectDate] = useState(curentdate)

  const {
    isLoading,
    error,
    isError,
    data: Tasklist,
    refetch,
  } = useQuery({
    queryKey: ["Tasklist"],
    queryFn: () =>
      apiRequest.get(`/api/dashboard/tasklist?startdate=${SelectDate.startdate}&enddate=${SelectDate.enddate}&assignto=${session?.user?.empobj_id}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (session?.user?.empobj_id) {
      refetch()
    }
  }, [session])


  return (
    <div>
      <DefaultLayout>
        <Breadcrumb pageName="Home" />

        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Daily Task
                </h3>
              </div>

              <div className="flex flex-wrap w-full justify-between p-2 ">
                {Tasklist?.map((data, key) => (
                  <div key={key} className={`py-8 px-4  border rounded-lg dark:border-strokedark ${data?.isCompleted ? "dark:bg-green-950" : "dark:bg-boxdark"}  my-2 `}>
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

          <div className="flex flex-col gap-9">

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
              <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Latest Notices
                </h3>
              </div>
              <div>
                <div className="max-w-full overflow-x-auto">
                  {NoticeList?.map((data, key) => (
                    <Noticelist data={data} key={key} />
                  ))}
                </div>
              </div>
            </div>
          </div>


        </div>
      </DefaultLayout>
    </div>
  );
};

Home.adminRoute = true;
export default Home;
