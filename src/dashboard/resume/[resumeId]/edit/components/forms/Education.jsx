import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '@/GlobalApi'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Education({enabledNext}) {
  const params = useParams()
  const formData = {
    universityName:'',
    degree:'',
    major:'',
    startDate:'',
    endDate:'',
    description:'',
  }
  const [loading, setLoading] = useState(false)
  const [educationalList, setEducationalList] = useState([])
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

  useEffect(()=>{
    resumeInfo?.education?.length>0&&setEducationalList(resumeInfo?.education)
  },[])

  const handleChange = (index, event)=>{    
    enabledNext(false)
    const newEntries = educationalList.slice();
    const {name, value} = event.target
    newEntries[index][name]=value
    setEducationalList(newEntries);
  }
  const addNewEducation = ()=>{
      setEducationalList([...educationalList, formData])
  }
  const removeEducation = ()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))
  }
  const onSave = (e)=>{
        e.preventDefault()
        setLoading(true)
        console.log(educationalList);
        
        GlobalApi.CreateUserEducation({...educationalList, resumeId:params.resumeId}).then((response)=>{
          enabledNext(true)
          setLoading(false)
          toast("Details updated")
        }, (error)=>{
          setLoading(false)
        })
  }
  useEffect(()=>{
    setResumeInfo({...resumeInfo, education:educationalList})
  },[educationalList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Education</h2>
        <p>Add your educational details</p>
        <div>
          {educationalList.map((item, index)=>(
            <div key={index}>
              <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                <div className='col-span-2'>
                  <label>University Name</label>
                  <Input defaultValue={item?.universityName} name='universityName' onChange={(e)=>handleChange(index, e)} />
                </div>
                <div>
                  <label>Degree</label>
                  <Input defaultValue={item?.degree} name='degree' onChange={(e)=>handleChange(index, e)} />
                </div>
                <div>
                  <label>Major</label>
                  <Input defaultValue={item?.major} name='major' onChange={(e)=>handleChange(index, e)} />
                </div>
                <div>
                  <label>Start Date</label>
                  <Input defaultValue={item?.startDate} type='date' name='startDate' onChange={(e)=>handleChange(index, e)} />
                </div>
                <div>
                  <label>End Date</label>
                  <Input defaultValue={item?.endDate} type='date' name='endDate' onChange={(e)=>handleChange(index, e)} />
                </div>
                <div className='col-span-2'>
                  <label>Description</label>
                  <Textarea defaultValue={item?.description} name='description' onChange={(e)=>handleChange(index, e)} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Button variant='outline' className='text-primary' onClick={addNewEducation}>+ Add More Education</Button>
                <Button variant='outline' className='text-primary' onClick={removeEducation}>- Remove</Button>
            </div>
            
            <Button type='submit' onClick={(e)=>onSave(e)} disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
    </div>
  )
}

export default Education