"use client";

import Breadcrumb from "../../../components/ui/Breadcrumbs/Breadcrumb";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import React, { useState } from "react";
import EmployeeForm from "../../../components/Form/EmployeeForm";
import { ErrorHandeling } from "../../../utils/Errorhandle";
import apiRequest from "../../../utils/apiRequest";
import { SuccessHandling } from "../../../utils/SuccessHandle";
import { useRouter } from "next/navigation";

const AddEmployee = () => {

  const router = useRouter()
  const [Loading, setLoading] = useState(false)
  const [EmployeeData, setEmployeeData] = useState({
    employee_first_name: "",
    employee_last_name: "",
    employee_email: "",
    alternate_number: "",
    gender: "",
    maratial_status: "",
    date_birth: "",
    address: "",
    phonenumber: "",
    hiredate: "",
    department: "",
    aadhar: "",
    pan: "",
    salary: "",
    bankinfo: {}
  })

  const HandleSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await apiRequest.post("/api/employee/employee", {
        ...EmployeeData,
        salarytype: {
          baseSalary: EmployeeData?.salary,
          grossSalary: EmployeeData?.salary
        }
      })
      router.push(`/employee/employeedetails/${data?.id}`)
      setLoading(false)
      SuccessHandling(data.message)
    } catch (error) {
      setLoading(false)
      ErrorHandeling(error)
    }
  }


  return (
    <>
      <DefaultLayout>
        <Breadcrumb pageName="Add Employee" />
        <EmployeeForm EmployeeData={EmployeeData} setEmployeeData={setEmployeeData} HandleSubmit={HandleSubmit} Loading={Loading} />
      </DefaultLayout>
    </>
  );
};


AddEmployee.adminRoute = true
export default AddEmployee;
