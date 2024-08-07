import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import AddIncome from '../../../components/Form/AddIncome'
import apiRequest from '../../../utils/apiRequest'
import { ErrorHandeling } from '../../../utils/Errorhandle'
import { SuccessHandling } from '../../../utils/SuccessHandle'
import { GetDate } from '../../../utils/FormateDate'
import { useRouter } from 'next/router'
import AddExpence from '../../../components/Form/AddExpence'

const Updateexpence = () => {

    const [Expence, setExpence] = useState()

    const router = useRouter()
    const { slug } = router.query

    const HandleGetExpence = async () => {
        try {
            const { data } = await apiRequest.get(`/api/expence/expence?id=${slug}`)
            setExpence(data)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandleGetExpence()
    }, [slug])

    const HandleSubmit = async () => {
        try {
            const { data } = await apiRequest.put("/api/expence/expence?id=" + slug, Expence)
            router.push("/expence/expencelist")
            SuccessHandling(data.message)
        } catch (error) {
            ErrorHandeling(error)
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Update Expence" />
            <AddExpence Expence={Expence} setExpence={setExpence} HandleSubmit={HandleSubmit} />
        </DefaultLayout>
    )
}
Updateexpence.adminRoute = true
export default Updateexpence