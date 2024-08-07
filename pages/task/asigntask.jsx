import React, { useState } from 'react'

import DefaultLayout from '../../components/Layouts/DefaultLayout'
import Breadcrumb from '../../components/ui/Breadcrumbs/Breadcrumb'
import AddTask from '../../components/Form/AddTask'
import apiRequest from '../../utils/apiRequest'
import { useQuery } from '@tanstack/react-query'
import { GetDate } from '../../utils/FormateDate'
import { SuccessHandling } from '../../utils/SuccessHandle'
import { ErrorHandeling } from '../../utils/Errorhandle'
import { useSession } from 'next-auth/react'

const Asigntask = () => {

  const { data: session } = useSession();
  
  const TaskState = {
    title: "",
    description: "",
    assignto: [],
    date: []
  }
  const [TaskData, setTaskData] = useState(TaskState)
  const [Loading, setLoading] = useState(false)

  const HandleSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await apiRequest.post("/api/task/task", { ...TaskData, assignby: session?.user?.empobj_id })
      setTaskData(TaskState)
      setLoading(false)
      SuccessHandling(data.message)
    } catch (error) {
      setLoading(false)
      ErrorHandeling(error)
    }
  }
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Asign Task" />
      <AddTask TaskData={TaskData} setTaskData={setTaskData} HandleSubmit={HandleSubmit} Loading={Loading} />
    </DefaultLayout>
  )
}

Asigntask.adminRoute = true
export default Asigntask