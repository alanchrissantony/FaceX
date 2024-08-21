import Header from '@/components/custom/header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/[resumeId]/edit/components/ResumePreview'
import GlobalApi from '@/GlobalApi'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { RWebShare } from 'react-web-share'
import { toast } from 'sonner'

function ViewResume() {

  const [resumeInfo, setResumeInfo] = useState()
  const params = useParams()

  useEffect(() => {
    getResume()
  }, [])

  const getResume = () => {
    GlobalApi.GetResumeById(params.resumeId).then((response) => {
      setResumeInfo(response.data);

    }, (error) => {
      console.log(error);

    })
  }

  const handleDownload = () => {
    window.print()
  }
  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id='no-print'>
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>Resume Overview</h2>
          <p className='text-center text-gray-400'>Your ultimate Ai generated resume if ready !</p>
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare
              data={{
                text: "Hey there! Excited to share my resume with you! Take a look and let me know what you think. 😊",
                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+params.resumeId+"/view",
                title: resumeInfo?.firstName+' '+resumeInfo?.lastName,
              }}
              onClick={() => toast("Shared successfully!")}
            >
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
        <div id='print-area'>
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume