import React, { Suspense, useEffect, useRef, useState } from "react";
import Loader from "../../../components/ui/Loader/Loader";
import Breadcrumb from "../../../components/ui/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import EmployeeForm from "../../../components/Form/EmployeeForm";
import apiRequest from "../../../utils/apiRequest";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import QRCode from "react-qr-code";
import { ErrorHandeling } from "../../../utils/Errorhandle";
import { SuccessHandling } from "../../../utils/SuccessHandle";
import AddDocument from "../../../components/Form/AddDocument";
import SalaryComponent from "../../../components/Form/SalaryComponent";
import html2canvas from 'html2canvas';

const Employeedetails = () => {
  const [Loading, setLoading] = useState(false);
  const [PageLoading, setPageLoading] = useState(false);
  const [Toggling, setToggling] = useState(1);

  const router = useRouter();
  const { slug } = router.query;

  // const [file, setFile] = useState(null);
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
    salary: "",
    pan: "",
    bankinfo: {},
    document: [],
  });

  const [SalarySetup, setSalarySetup] = useState({
    baseSalary: "",
    additions: {},
    deductions: {},
    grossSalary: "",
  });

  const HandleToggle = (num) => {
    setToggling(num);
  };

  const HandlegetEmployee = async () => {
    setPageLoading(true);
    try {
      const { data } = await apiRequest.get(`/api/employee/details/${slug}`);
      setEmployeeData({ ...data, department: data?.department?._id, department_name: data?.department?.name });
      setSalarySetup(data?.salarytype || {});
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      ErrorHandeling(error);
    }
  };

  useEffect(() => {
    HandlegetEmployee();
  }, [slug]);

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        HandleUploadProfile(reader.result);
      }
    };
    reader.onerror = (error) => {
      console.error("Error converting file to Base64:", error);
    };
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    convertToBase64(file);
  };

  const HandleUploadProfile = async (profiles) => {
    setPageLoading(true);
    try {
      await apiRequest.put(`/api/employee/details/${slug}`, {
        profile: profiles,
      });
      SuccessHandling("Profile Updated");
      location.reload();
    } catch (error) {
      ErrorHandeling(error);
    }
  };

  const HandleSubmit = async () => {
    setLoading(true);
    try {
      await apiRequest.put(`/api/employee/details/${slug}`, EmployeeData);
      location.reload();
      setLoading(false);
      SuccessHandling("Information Updated");
    } catch (error) {
      setLoading(false);
      ErrorHandeling(error);
    }
  };

  const {
    isLoading,
    data: SalaryTypes,
    refetch,
  } = useQuery({
    queryKey: ["SalaryTypes"],
    queryFn: () =>
      apiRequest.get(`/api/payroll/typesetup`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    refetch();
  }, []);

  const HandleSubmitSalary = async () => {
    setLoading(true);
    try {
      await apiRequest.put(`/api/employee/details/${slug}`, {
        salarytype: SalarySetup,
      });
      location.reload();
      setLoading(false);
      SuccessHandling("Information Updated");
    } catch (error) {
      setLoading(false);
      ErrorHandeling(error);
    }
  };


  const handleDownloadImage = async () => {
    const element = document.getElementById('print'); // Select the element by ID

    if (element) {
      const canvas = await html2canvas(element); // Capture the element as a canvas
      const data = canvas.toDataURL('image/jpg'); // Convert the canvas to a data URL (JPEG format)
      const link = document.createElement('a'); // Create a temporary anchor element

      link.href = data; // Set the data URL as the href for the anchor
      link.download = EmployeeData?.employee_id; // Set the desired download filename

      document.body.appendChild(link); // Append the anchor to the document body
      link.click(); // Programmatically click the anchor to trigger the download
      document.body.removeChild(link); // Remove the anchor from the document
    }
  };

  return (
    <>
      <DefaultLayout>
        {PageLoading && <Loader />}
        <Breadcrumb pageName="Employee Details" />
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-4">
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5 mt-24">
            <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2 ">
                <div className="flex items-center justify-center w-full h-full">
                  <div className="overflow-hidden rounded-full h-40 w-40">
                    <Image
                      src={EmployeeData?.profile || "/profile.png"}
                      alt="Profile Picture"
                      width={160} // Adjusted width to fit the container
                      height={160} // Adjusted height to fit the container
                      className="object-cover"
                    />
                  </div>
                </div>

                <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2">
                  <svg
                    className="fill-current"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                      fill=""
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                      fill=""
                    />
                  </svg>
                  <input
                    type="file"
                    name="profile"
                    id="profile"
                    onChange={handleFileInputChange}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                <p className="font-medium">{EmployeeData?.employee_id}</p>
              </h3>
              <p className="font-medium">
                {EmployeeData?.employee_first_name}{" "}
                {EmployeeData?.employee_last_name}
              </p>

              <div className="mx-auto max-w-180">
                <h4 className="font-semibold text-black dark:text-white">
                  Address
                </h4>
                <p className="mt-4.5">{EmployeeData?.address}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap w-full justify-evenly ">
            {Toggling == 1 ? (
              <button
                onClick={() => HandleToggle(1)}
                className=" my-2 inline-flex items-center justify-center gap-2.5  bg-slate-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Personal Details
              </button>
            ) : (
              <button
                onClick={() => HandleToggle(1)}
                className=" my-2 inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Personal Details
              </button>
            )}
            {Toggling == 2 ? (
              <button
                onClick={() => HandleToggle(2)}
                className=" my-2 inline-flex items-center justify-center gap-2.5  bg-slate-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Documents
              </button>
            ) : (
              <button
                onClick={() => HandleToggle(2)}
                className=" my-2 inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Documents
              </button>
            )}
            {Toggling == 3 ? (
              <button
                onClick={() => HandleToggle(3)}
                className=" my-2 inline-flex items-center justify-center gap-2.5  bg-slate-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Salary Setup
              </button>
            ) : (
              <button
                onClick={() => HandleToggle(3)}
                className=" my-2 inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                Salary Setup
              </button>
            )}
            {Toggling == 4 ? (
              <button
                onClick={() => HandleToggle(4)}
                className=" my-2 inline-flex items-center justify-center gap-2.5  bg-slate-700 px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                ID Card
              </button>
            ) : (
              <button
                onClick={() => HandleToggle(4)}
                className=" my-2 inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                ID Card
              </button>
            )}

            {/* <button
              className="my-2 inline-flex items-center justify-center gap-2.5 bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Biometric
            </button> */}
          </div>
        </div>

        {Toggling == 1 && (
          <EmployeeForm
            EmployeeData={EmployeeData}
            setEmployeeData={setEmployeeData}
            HandleSubmit={HandleSubmit}
            Loading={Loading}
          />
        )}
        {Toggling == 2 && (
          <AddDocument
            EmployeeData={EmployeeData}
            HandlegetEmployee={HandlegetEmployee}
            Loading={Loading}
          />
        )}
        {Toggling == 3 && (
          <SalaryComponent
            SalarySetup={SalarySetup}
            SalaryTypes={SalaryTypes}
            setSalarySetup={setSalarySetup}
            EmployeeData={EmployeeData}
            HandleSubmitSalary={HandleSubmitSalary}
          />
        )}
        {Toggling == 4 && (
          <>
            <div id="print" className="capture-element flex justify-evenly w-full bg-white p-4" >
              <div className="relative">
                <div className=" w-full absolute justify-center align-middle top-30">
                  <div>
                    <div className="flex items-center justify-center w-full h-full">
                      <div className="overflow-hidden rounded-full h-36 w-36 border-4 border-stone-100">
                        <Image
                          src={EmployeeData?.profile || "/profile.png"}
                          alt="Profile Picture"
                          width={160} // Adjusted width to fit the container
                          height={160} // Adjusted height to fit the container
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <h1 className="text-black text-center text-3xl font-medium uppercase">
                        {EmployeeData?.employee_first_name} <br />
                        {EmployeeData?.employee_last_name}
                      </h1>
                    </div>
                    <div className="mt-2">
                      <h1 className="text-black text-center text-base font-medium uppercase">
                        {EmployeeData?.department_name}
                      </h1>
                    </div>
                    <div className="mt-5 w-full flex justify-center">
                      <div className="flex items-center justify-center  bg-gray-100">
                        {/* <div className="p-2 bg-white rounded-lg border-4 border-dashed border-blue-500"> */}
                          <QRCode
                            size={60}
                            value={`emp.checkuphealth.in/employee/details/${EmployeeData?.employee_id}`}
                            viewBox={`0 0 60 60`}
                          />
                        {/* </div> */}
                      </div>
                    </div>
                    <div className="mt-2">
                      <h1 className="text-black text-center text-base font-medium uppercase">
                        ID {EmployeeData?.employee_id}
                      </h1>
                    </div>
                  </div>
                </div>
                <Image
                  src="/idfront.jpg"
                  width={300}
                  height={300}
                  alt="profile"
                />
              </div>
              <div>
                <Image
                  src="/idback.jpg"
                  width={300}
                  height={300}
                  alt="profile"
                />
              </div>

            </div>

            <button onClick={handleDownloadImage} className="mt-4 p-2 bg-blue-500 text-white flex justify-center w-full">
              Download ID Card
            </button>
          </>
        )}
      </DefaultLayout>
    </>
  );
};

Employeedetails.adminRoute = true;
export default Employeedetails;
