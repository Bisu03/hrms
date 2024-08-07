import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import AddIncome from '../../../components/Form/AddIncome'
import apiRequest from '../../../utils/apiRequest'
import { ErrorHandeling } from '../../../utils/Errorhandle'
import { SuccessHandling } from '../../../utils/SuccessHandle'
import { GetDate } from '../../../utils/FormateDate'
import { useRouter } from 'next/router'

const Updateincome = () => {

    const [Income, setIncome] = useState({})

    const router = useRouter()
    const { slug } = router.query

    const HandleGetIncome = async () => {
        try {
            const { data } = await apiRequest.get(`/api/income/income?id=${slug}`)
            setIncome(data)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandleGetIncome()
    }, [slug])

    const HandleSubmit = async () => {
        try {
            const { data } = await apiRequest.put("/api/income/income?id=" + slug, Income)
            router.push("/expence/incomelist")
            SuccessHandling(data.message)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Update Income" />
            <AddIncome Income={Income} setIncome={setIncome} HandleSubmit={HandleSubmit} />
        </DefaultLayout>
    )
}
Updateincome.adminRoute = true
export default Updateincome