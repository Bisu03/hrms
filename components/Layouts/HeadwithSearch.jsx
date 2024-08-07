import React from 'react'

const HeadwithSearch = ({ title, SelectDate, setSelectDate }) => {

    const HandleChange = (e) => {
        setSelectDate({ ...SelectDate, [e.target.name]: e.target.value })
    }

    return (
        <div className="px-4 py-6 md:px-6 xl:px-7.5 flex justify-between flex-wrap w-full">
            <h4 className="text-xl font-semibold text-black dark:text-white">
                {title}
            </h4>
            <div>

                <input
                    type="date"
                    name="startdate"
                    value={SelectDate.startdate}
                    onChange={HandleChange
                    }
                    className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

                <input
                    type="date"
                    name="enddate"
                    value={SelectDate.enddate}
                    onChange={HandleChange
                    }
                    className=" rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />

            </div>
        </div>
    )
}

export default HeadwithSearch