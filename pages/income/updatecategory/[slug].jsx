import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import apiRequest from '../../../utils/apiRequest'
import { SuccessHandling } from '../../../utils/SuccessHandle'
import { ErrorHandeling } from '../../../utils/Errorhandle'
import { useRouter } from 'next/router'
import AddIncomeCategory from '../../../components/Form/AddIncomeCategory'

const Updatecategory = () => {
    const router = useRouter()
    const { slug } = router.query

    const [Name, setName] = useState("")
    const [Loading, setLoading] = useState(false)
    const HandleGetCategory = async () => {
        try {
            const { data } = await apiRequest.get(`/api/income/category?id=${slug}`)
            setName(data?.name)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandleGetCategory()
    }, [slug])

    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.put(`/api/income/category?id=${slug}`, {
                name: Name
            })
            router.push("/income/addcategory")
            setLoading(false)
            SuccessHandling(data.message)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }


    return (
        <DefaultLayout>
            <Breadcrumb pageName="Update Category" />
            <AddIncomeCategory Name={Name} setName={setName} HandleSubmit={HandleSubmit} Loading={Loading} />
        </DefaultLayout>
    )
}

Updatecategory.adminRoute = true
export default Updatecategory