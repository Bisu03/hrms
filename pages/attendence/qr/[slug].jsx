import React from 'react'
import DefaultLayout from '../../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../../components/ui/Breadcrumbs/Breadcrumb'
import { useRouter } from 'next/router'
import QRCode from "react-qr-code";

const Qr = () => {

    const router = useRouter()
    const { slug } = router.query
    return (
        <DefaultLayout>
            <Breadcrumb pageName="Scanned Qr" />
            <div className="col-span-12 xl:col-span-7">

                <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default  sm:px-7.5 xl:pb-1">

                    <div className="px-4 py-6 md:px-6 xl:px-7.5">
                        <h4 className="text-xl font-semibold text-black  text-center">
                            Scan This QR To Take Your Attendance
                        </h4>
                    </div>
                    <div className='h-full w-full p-4 flex justify-center'>
                        <QRCode
                            size={256}
                            value={slug}
                            viewBox={`0 0 256 256`}
                        />
                    </div>
                </div>
            </div>
        </DefaultLayout>
    )
}

Qr.adminRoute = true
export default Qr