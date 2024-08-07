import React from 'react'
import DefaultLayout from '../Layouts/DefaultLayout'
import Breadcrumb from '../ui/Breadcrumbs/Breadcrumb'
import Loader from '../ui/Loader/Loader'
import HeadwithSearch from '../Layouts/HeadwithSearch'
import { FormateDate } from '../../utils/FormateDate'
import apiRequest from '../../utils/apiRequest'
import { SuccessHandling } from '../../utils/SuccessHandle'
import { ErrorHandeling } from '../../utils/Errorhandle'

const LeaveRequests = ({ data }) => {

  const HandleUpdate = async (id, statusdata) => {
    if (window.confirm('Are you sure you want to update this item?')) {
      try {
        const { data } = await apiRequest.put("/api/leave/status/" + id, {
          isAproved: statusdata
        })
        location.reload()
        SuccessHandling(data.message)
      } catch (error) {
        ErrorHandeling(error)
      }
    }
  }


  return (
    <>
      <tr key={data._id}>

        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {data?.employee_id?.employee_first_name}  {data?.employee_id?.employee_last_name}
          </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {data.reason}
          </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {FormateDate(data.date)}
          </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {data.numberofleave}
          </p>
        </td>
        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <p className="text-black dark:text-white">
            {data.isAproved}
          </p>
        </td>

        <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
          <div className="flex items-center space-x-3.5">
            <span onClick={() => HandleUpdate(data._id, "Approved")} className="cursor-pointer bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">Approved</span>
            <span onClick={() => HandleUpdate(data._id, "Reject")} className=" cursor-pointer bg-red text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">Reject</span>
          </div>
        </td>
      </tr></>

  )
}


export default LeaveRequests