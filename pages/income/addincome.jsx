import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import AddIncome from '../../components/Form/AddIncome'
import apiRequest from '../../utils/apiRequest'
import { ErrorHandeling } from '../../utils/Errorhandle'
import { SuccessHandling } from '../../utils/SuccessHandle'
import { GetDate } from '../../utils/FormateDate'

const addincome = () => {
    const IncomeState = {
        desc: "",
        category: "",
        amount: 0,
        date: GetDate()
    }
    const [Income, setIncome] = useState(IncomeState)

    const HandleSubmit = async () => {
        try {
            const { data } = await apiRequest.post("/api/income/income", Income)
            setIncome(IncomeState)
            SuccessHandling(data.message)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Income" />
            <AddIncome Income={Income} setIncome={setIncome} HandleSubmit={HandleSubmit} />
        </DefaultLayout>
    )
}

export default addincome