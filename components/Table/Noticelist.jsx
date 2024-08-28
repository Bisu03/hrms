import React, { useEffect, useState } from "react";
import { compareDates, FormateDate } from "../../utils/FormateDate";
import { MdFiberNew } from "react-icons/md";

const Noticelist = ({ data }) => {
    const [colorClass, setColorClass] = useState("text-red-800");

    useEffect(() => {
        const colors = ["text-red-700", "text-red"];
        const changeColor = () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            setColorClass(randomColor);
        };
        const intervalId = setInterval(changeColor, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleDownload = (filename) => {
        const link = document.createElement("a");
        link.href = filename;
        link.download = GetDate();
        link.click();
    };

    return (
        <>

            <div key={data._id} className={`py-8 px-4  border rounded-lg dark:border-strokedark dark:bg-boxdark  my-2 `}>
                <div className="h-full flex items-start">
                    <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
                            {FormateDate(data.date)}{" "}
                            {compareDates(data.date) ? (
                                <MdFiberNew className={`ml-3 h-6 w-6 ${colorClass}`} />
                            ) : undefined}
                        </h2>
                        <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                            {" "}
                            {data.title}
                        </h1>
                        <div className="flex w-full ">
                            <div className="text-blue-400 text-xs font-medium me-2 p-2 rounded   border border-blue- flex items-center">
                                {data.url ? " Download/View" : "No Document Available"}
                            </div>
                        </div>
                    </div>

                </div>

            </div>


        </>
    );
};

export default Noticelist;
