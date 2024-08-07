import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import AddDeparment from '../../components/Form/AddDeparment'
import apiRequest from '../../utils/apiRequest'
import { ErrorHandeling } from '../../utils/Errorhandle'
import { SuccessHandling } from '../../utils/SuccessHandle'

const Adddepartment = () => {
    const [Name, setName] = useState("")
    const [Loading, setLoading] = useState(false)

    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.post("/api/department/department", {
                name: Name
            })
            setLoading(false)
            SuccessHandling(data.message)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Department" />
            <AddDeparment Name={Name} setName={setName} HandleSubmit={HandleSubmit} Loading={Loading} />
        </DefaultLayout>
    )
}

Adddepartment.adminRoute = true
export default Adddepartment