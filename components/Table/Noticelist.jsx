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
            <tr key={data._id}>
                <td className="border-b border-[#eee] px-4 py-5  w-90">
                    {data.title}
                </td>
                <td className="border-b border-[#eee] px-4 py-5  ">
                    <p
                        className="text-black dark:text-white link cursor-pointer"
                        onClick={() => handleDownload(data.url)}>
                        {data.url ? " Download/View" : "No Document Available"}
                    </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 ">

                    <p
                        className="text-black dark:text-white link cursor-pointer flex"
                    >
                        {FormateDate(data.date)}{" "}
                        {compareDates(data.date) ? (
                            <MdFiberNew className={`ml-3 h-6 w-6 ${colorClass}`} />
                        ) : undefined}

                    </p>

                </td>
            </tr>
        </>
    );
};

export default Noticelist;
