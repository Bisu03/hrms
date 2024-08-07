import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import Breadcrumb from "../../../components/ui/Breadcrumbs/Breadcrumb";
import { BiCross } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import toast from "react-hot-toast";
import Spinner from "../../../components/ui/Spinner";
import { useRouter } from "next/router";
import { ErrorHandeling } from "../../../utils/Errorhandle";
import apiRequest from "../../../utils/apiRequest";
import { SuccessHandling } from "../../../utils/SuccessHandle";

const Permission = () => {
    const InitialState = {
        permission: [],
    };
    const [Loading, setLoading] = useState(false);
    const [Permission, setPermission] = useState(InitialState);

    const router = useRouter()
    const { slug } = router.query

    const HandleFetchData = async () => {
        try {
            const { data } = await apiRequest.get(`/api/department/details/${slug}`)
            setPermission({ ...data, permission: data?.permission || [] })
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandleFetchData()
    }, [slug])


    const HandleAddPermission = (itemname) => {
        setPermission(prevState => {
            const { permission } = prevState;
            if (permission.includes(itemname)) {
                return { ...prevState, permission: permission.filter(item => item !== itemname) };
            } else {
                return { ...prevState, permission: [...permission, itemname] };
            }
        });

    };


    const HandleSavePermission = async () => {
        if (window.confirm('Are you sure you want to save this?')) {
            setLoading(true)
            try {
                const { data } = await apiRequest.put(`/api/department/details/${slug}`, { permission: Permission?.permission })
                setLoading(false)
                SuccessHandling(data.message)
            } catch (error) {
                setLoading(false)
                ErrorHandeling(error)
            }
        }
    }
    console.log(Permission);

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Manage Page Access" />
            <div className="col-span-12 xl:col-span-7">
                <div className=" rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6  shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <h1>Grant Access To {Permission?.name}</h1>
                    <div className="flex flex-wrap w-full justify-start my-5 ">

                        <span
                            onClick={() => HandleAddPermission("Attendence")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Attendence") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Attendence") && <CgClose />}  Attendence
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Leave Management")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Leave Management") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Leave Management") && <CgClose />}  Leave Management
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Employee Management")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Employee Management") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Employee Management") && <CgClose />}  Employee Management
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Department Management")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Department Management") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Department Management") && <CgClose />}  Department Management
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Income Management")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Income Management") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Income Management") && <CgClose />}  Income Management
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Expence Management")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Expence Management") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Expence Management") && <CgClose />}  Expence Management
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Notice")}
                            className={` my-2 cursor-pointer ${Permission?.permission?.includes("Notice") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Notice") && <CgClose />}  Notice
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Task Management")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Task Management") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Task Management") && <CgClose />}  Task Management
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Payroll")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Payroll") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Payroll") && <CgClose />}  Payroll
                        </span>
                        <span
                            onClick={() => HandleAddPermission("Setting")}
                            className={`my-2 cursor-pointer ${Permission?.permission?.includes("Setting") ? "bg-red" : "bg-primary"} text-white text-xs font-medium me-2 px-2.5 py-2 rounded   border border-blue- flex items-center`}>
                            {Permission?.permission?.includes("Setting") && <CgClose />}  Setting
                        </span>
                      
                    </div>

                    <button
                        onClick={HandleSavePermission}
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        {Loading && <Spinner />}  Save
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
};

Permission.adminRoute = true;
export default Permission;
