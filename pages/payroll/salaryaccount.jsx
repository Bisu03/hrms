import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import CreateEmployeeAccount from '../../components/Form/CreateEmployeeAccount'
import apiRequest from '../../utils/apiRequest'
import { ErrorHandeling } from '../../utils/Errorhandle'
import { SuccessHandling } from '../../utils/SuccessHandle'

const Salaryaccount = () => {

    const [EmployeeDetails, setEmployeeDetails] = useState([])
    const [Loading, setLoading] = useState(false)

    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.post("/api/payroll/createfundacc", EmployeeDetails)
            setEmployeeDetails([])
            setLoading(false)
            SuccessHandling(data.message)
            location.reload()
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }
    return (
        <>
            <DefaultLayout>
                <Breadcrumb pageName="Employee Salary Account Setup" />
                <CreateEmployeeAccount EmployeeDetails={EmployeeDetails} setEmployeeDetails={setEmployeeDetails} HandleSubmit={HandleSubmit} Loading={Loading} />
            </DefaultLayout>
        </>
    )
}

Salaryaccount.adminRoute = true
export default Salaryaccount