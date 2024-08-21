import { AiChatSession } from '@/AiModel'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '@/GlobalApi'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Summary({enabledNext}) {
    const params = useParams()
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
    const [loading, setLoading] = useState(false)
    const [summary, setSummary] = useState()
    const [aiGereratedSummary, setAiGereratedSummary] = useState()

    const prompt = `
Job Title: {jobTitle}
Provide a summary for a resume within 4-5 lines in JSON format. Include fields for experience level and summary. The experience levels should be Fresher, Mid-level, and Experienced. Use the following format:

{
    {
      "experienceLevel": "Fresher",
      "summary": "Brief summary for a fresher."
    },
    {
      "experienceLevel": "Mid-level",
      "summary": "Brief summary for a mid-level professional."
    },
    {
      "experienceLevel": "Experienced",
      "summary": "Brief summary for an experienced professional."
    }
}

Based on the job title {jobTitle}, generate the summaries.
`;
    useEffect(()=>{
        console.log(resumeInfo,1000);
        resumeInfo?.summary?.length>0&&setSummary(resumeInfo?.summary)
    },[])
    useEffect(()=>{
        enabledNext(false)
        summary&&setResumeInfo({...resumeInfo, summary:summary})
    },[summary])

    const generateAiSummary = async()=>{
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle)
        const result = await AiChatSession.sendMessage(PROMPT)
        setAiGereratedSummary(JSON.parse(result.response.text()))
        setLoading(false)
    }

    const onSave = (e)=>{
        e.preventDefault()
        setLoading(true)

        const data = {
            _id:params.resumeId,
            summary:summary
        }
        GlobalApi.UpdateUserResumes(data).then(response =>{
            enabledNext(true)
            setLoading(false)
            toast("Details updated")
        }, (error)=>{
            setLoading(false)
        })
    }
  return (
    <div>
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Summary</h2>
            <p>Add Summary for your job title</p>
            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-end'>
                    <label>Add Summary</label>
                    <Button type='button' onClick={generateAiSummary} variant='outline' size='sm' className='border-primary text-primary flex gap-2'><Brain className='h-4 w-4'/> Generate from AI</Button>
                </div>
                <Textarea defaultValue={summary} onChange={(e)=>setSummary(e.target.value)} required className='mt-5'/>
                <div className='mt-3 flex justify-end'>
                    <Button type='submit' disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
                </div>
            </form>
        </div>
        {aiGereratedSummary&& 
            <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGereratedSummary?.map((item, index)=>(
                    <div key={index} onClick={()=>setSummary(item?.summary)} className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>{item?.experienceLevel}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>
        }
    </div>
  )
}

export default Summary