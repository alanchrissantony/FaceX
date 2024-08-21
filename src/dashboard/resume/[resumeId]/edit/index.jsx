import React, { useEffect, useState } from 'react'
import FormSection from './components/FormSection';
import ResumePreview from './components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import fake from '@/data/fake';
import GlobalApi from '@/GlobalApi';
import { useParams } from 'react-router-dom';

function EditResume() {

    const [resumeInfo, setResumeInfo] = useState(null)
    const params = useParams()

    useEffect(()=>{
        setResumeInfo(fake)
        getUserResume()
    },[])

    const getUserResume = ()=>{
      GlobalApi.GetResumeById(params.resumeId).then((response)=>{
          setResumeInfo(response.data)     
      }, (error)=>{
        console.log(error);
      })
    }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
            {/* From Section */}
            <FormSection/>
            {/* Preview Section */}
            <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume