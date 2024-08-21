import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import GlobalApi from '@/GlobalApi'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'


function Experience({enabledNext}) {
    const params=useParams();

    const formField={
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummary:'',
    }

    const [loading, setLoading] = useState(false)
    const [experienceList, setExperienceList] = useState([])
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    useEffect(()=>{
        enabledNext(false)
        resumeInfo?.experience?.length>0&&setExperienceList(resumeInfo?.experience)
        
    },[])

    const handleChange = (event, index)=>{
        const newEntries = experienceList.slice();
        const {name, value} = event.target
        newEntries[index][name]=value
        setExperienceList(newEntries);
    }
    const handleRichTextEditor = (event, name, index)=>{
        const newEntries = experienceList.slice();
        newEntries[index][name]=event.target.value
        setExperienceList(newEntries);
    }
    const addNewExperience = ()=>{
        setExperienceList([...experienceList, {...formField}])
    }
    const removeExperience = ()=>{
        setExperienceList(experienceList=>experienceList.slice(0,-1))
    }

    const onSave = (e)=>{
        e.preventDefault()
        setLoading(true)
        
        GlobalApi.CreateUserExperience({...experienceList, resumeId:params.resumeId}).then((response)=>{
            enabledNext(true)
            setLoading(false)
            toast("Details updated")
        }, (error)=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        setResumeInfo({...resumeInfo, experience:experienceList})
    },[experienceList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add your previous job experience</p>
        <div>
            {experienceList.map((item, index)=>(
                <div key={index}>
                    <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                        <div>
                            <label>Position Title</label>
                            <Input defaultValue={item?.title} name='title' onChange={(event)=>handleChange(event, index)}/>
                        </div>
                        <div>
                            <label>Company Name</label>
                            <Input defaultValue={item?.companyName} name='companyName' onChange={(event)=>handleChange(event, index)}/>
                        </div>
                        <div>
                            <label>City</label>
                            <Input defaultValue={item?.city} name='city' onChange={(event)=>handleChange(event, index)}/>
                        </div>
                        <div>
                            <label>State</label>
                            <Input defaultValue={item?.state} name='state' onChange={(event)=>handleChange(event, index)}/>
                        </div>
                        <div>
                            <label>Start Date</label>
                            <Input defaultValue={item?.startDate} type='date' name='startDate' onChange={(event)=>handleChange(event, index)}/>
                        </div>
                        <div>
                            <label>End Date</label>
                            <Input defaultValue={item?.endDate} type='date' name='endDate' onChange={(event)=>handleChange(event, index)}/>
                        </div>
                        <div className='col-span-2'>
                            {/* Work Summary */}
                            <RichTextEditor defaultValue={item?.workSummary} index={index} onRichTextEditorChange={(event)=>handleRichTextEditor(event, 'workSummary', index)}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Button variant='outline' className='text-primary' onClick={addNewExperience}>+ Add More Experience</Button>
                <Button variant='outline' className='text-primary' onClick={removeExperience}>- Remove</Button>
            </div>
            
            <Button type='submit' onClick={(e) => onSave(e)}  disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
    </div>
  )
}

export default Experience