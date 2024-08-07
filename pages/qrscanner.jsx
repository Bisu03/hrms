import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/Layouts/DefaultLayout'
import Breadcrumb from '../components/ui/Breadcrumbs/Breadcrumb'
import { Scanner } from '@yudiel/react-qr-scanner';
import apiRequest from '../utils/apiRequest';
import { SuccessHandling } from '../utils/SuccessHandle';
import { ErrorHandeling } from '../utils/Errorhandle';
import { useSession } from 'next-auth/react';
import { FormattedTime, GetDate } from '../utils/FormateDate';
import { useRouter } from 'next/navigation';

const Qrscanner = () => {
    const router = useRouter()
    const [QrDate, setQrDate] = useState()
    const { data: session } = useSession();
    let time = FormattedTime()

    const HandlegetEmployee = async () => {
        try {
            const { data } = await apiRequest.post(`/api/attendence/qrattendence`, {
                qr_code: QrDate,
                employee_id: session.user.empobj_id,
                check_in: time,
                check_out: time,
                date: GetDate()
            })
            router.push(`/attendence/empattendence/${data._id}`)
            // SuccessHandling(data.message)
        } catch (error) {
            ErrorHandeling(error)
        }

    }

    useEffect(() => {
        if (QrDate) {
            HandlegetEmployee()
        }
    }, [QrDate])


    return (
        <DefaultLayout>
            <div className="mx-auto max-w-242.5">
                <Breadcrumb pageName="QR Scaner" />
                <Scanner onScan={(result) => setQrDate(result[0]?.rawValue)} />

            </div>
        </DefaultLayout>
    )
}

export default Qrscanner