import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import AddDeparment from '../../../components/Form/AddDeparment'
import apiRequest from '../../../utils/apiRequest'
import { ErrorHandeling } from '../../../utils/Errorhandle'
import { SuccessHandling } from '../../../utils/SuccessHandle'
import { useRouter } from 'next/router'

const Updatedepartment = () => {
    const [Name, setName] = useState("")
    const [Loading, setLoading] = useState(false)

    const router = useRouter()
    const { slug } = router.query

    const HandleGetDepartment = async () => {
        try {
            const { data } = await apiRequest.get(`/api/department/details/${slug}`)
            setName(data?.name)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }

    useEffect(() => {
        HandleGetDepartment()
    }, [slug])


    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.put("/api/department/department?id=" + slug, {
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
            <Breadcrumb pageName="Update Department" />
            <AddDeparment Name={Name} setName={setName} HandleSubmit={HandleSubmit} Loading={Loading} />
        </DefaultLayout>
    )
}

Updatedepartment.adminRoute = true
export default Updatedepartment