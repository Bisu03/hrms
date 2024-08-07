import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import AddExpence from '../../components/Form/AddExpence'
import { GetDate } from '../../utils/FormateDate'
import { ErrorHandeling } from '../../utils/Errorhandle'
import { SuccessHandling } from '../../utils/SuccessHandle'
import apiRequest from '../../utils/apiRequest'

const Addexpence = () => {
    const Expencetate = {
        desc: "",
        category: "",
        amount: 0,
        date: GetDate()
    }
 
    const [Expence, setExpence] = useState(Expencetate)

    const HandleSubmit = async () => {
        try {
            const { data } = await apiRequest.post("/api/expence/expence", Expence)
            setExpence(Expencetate)
            SuccessHandling(data.message)
        } catch (error) {
            ErrorHandeling(error)
        }
    }


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Expence" />
            <AddExpence Expence={Expence} setExpence={setExpence} HandleSubmit={HandleSubmit} />
        </DefaultLayout>
    )
}

Addexpence.adminRoute = true
export default Addexpence