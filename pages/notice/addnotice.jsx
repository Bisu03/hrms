import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import AddNotice from '../../components/Form/AddNotice'
import { GetDate } from '../../utils/FormateDate'
import apiRequest from '../../utils/apiRequest'
import { SuccessHandling } from '../../utils/SuccessHandle'
import { ErrorHandeling } from '../../utils/Errorhandle'

const Addnotice = () => {

    const NoticeState = {
        title: "",
        url: "",
        date: GetDate()
    }
    const [Notice, setNotice] = useState(NoticeState)
    const [Loading, setLoading] = useState(false)

    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.post("/api/notice/notice", Notice)
            setNotice(NoticeState)
            setLoading(false)
            SuccessHandling(data.message)
        } catch (error) {
            setLoading(false)
            ErrorHandeling(error)
        }
    }

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add Notice" />
            <AddNotice Notice={Notice} setNotice={setNotice} HandleSubmit={HandleSubmit} Loading={Loading} />
        </DefaultLayout>
    )
}

Addnotice.adminRoute = true
export default Addnotice