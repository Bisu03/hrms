import React, { useState } from 'react'
import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import Addusers from '../../components/Form/Addusers'
import apiRequest from '../../utils/apiRequest'
import { ErrorHandeling } from '../../utils/Errorhandle'
import { useRouter } from 'next/navigation'
import { SuccessHandling } from '../../utils/SuccessHandle'

const Adduser = () => {

    const router = useRouter()
    const [Loading, setLoading] = useState(false)

    const userinfo = {
        employee_name: "",
        employee_email: "",
        phonenumber: "",
        password: "",
        role: "Admin",
    }

    const [UserInfo, setUserInfo] = useState(userinfo)

    const HandleSubmit = async () => {
        setLoading(true)
        try {
            const { data } = await apiRequest.post("/api/user/user", UserInfo)
            setUserInfo(userinfo)
            router.push("/user/userlist")
            setLoading(false)
            SuccessHandling("user added")
        } catch (error) {
            setLoading(false)
            console.log(error);
            ErrorHandeling(error)
        }

    }
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Add user" />
            <Addusers HandleSubmit={HandleSubmit} UserInfo={UserInfo} setUserInfo={setUserInfo} Loading={Loading} />
        </DefaultLayout>
    )
}

Adduser.adminRoute = true
export default Adduser