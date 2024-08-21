import Header from '@/components/custom/header'
import React, { useEffect, useState } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react'
import GlobalApi from '@/GlobalApi'
import ResumeCardItem from './components/ResumeCardItem'

function Dashboard() {

    const {user} = useUser()
    const [resumeList, setResumeList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        user && GetResumeList()
    },[user])
    const GetResumeList = ()=>{
        setLoading(true)
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress).then(response =>{
            setResumeList(response.data)
            setLoading(false)
        }, (error)=>{
            setLoading(false)
        })
    }
  return (
    <div>
        <div className='p-10 md:px-20 lg:px32'>
            <h2 className='font-bold text-3xl'>My Resume</h2>
            <p>Start Creating AI Resume to your next Job role</p>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
                <AddResume/>
                {resumeList.length>0 && resumeList.map((resume, index)=>(
                    <ResumeCardItem resume={resume} key={index} refreshData={GetResumeList}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Dashboard