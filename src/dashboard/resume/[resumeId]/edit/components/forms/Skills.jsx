import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '@/GlobalApi'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

function Skills({enabledNext}) {
    const params = useParams()
    const formData = {
        name:'',
        rating:0,
        resumeId:params.resumeId
    }
    const [loading, setLoading] = useState(false)
    const [skillList, setSkillList] = useState([])
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    useEffect(()=>{
        resumeInfo?.skills?.length>0&&setSkillList(resumeInfo?.skills)
    },[])
    const handleChange = (index, name, value)=>{
        enabledNext(false)
        const newEntries = skillList.slice()
        newEntries[index][name] = value
        setSkillList(newEntries)
    }
    const addNewSkills = ()=>{
        setSkillList([...skillList, {name:'', rating:0}])
    }
    const removeSkills = ()=>{
        setExperienceList(skillList=>skillList.slice(0,-1))
    }
    const onSave = (e)=>{
        e.preventDefault()
        setLoading(true)

        GlobalApi.CreateUserSkill({...skillList, resumeId:params.resumeId}).then((response)=>{
            enabledNext(true)
            setLoading(false)
            toast('Details updated')
        }, (error)=>{
            setLoading(false)
        })
    }

    useEffect(()=>{
        setResumeInfo({...resumeInfo, skills:skillList})
    },[skillList])
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Skills</h2>
        <p>Add your skills</p>
        <div>
            {skillList.map((item, index)=>(
                <div key={index} className='flex justify-between mb-2 border rounded-lg p-3'>
                    <div>
                        <label className='text-xs'>Name</label>
                        <Input defaultValue={item?.name} className='w-full' onChange={(e)=>{handleChange(index, 'name', e.target.value)}}/>
                    </div>
                    <Rating style={{maxWidth:120}} value={item?.rating} onChange={(v)=>{handleChange(index, 'rating', v)}}/>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
                <Button variant='outline' className='text-primary' onClick={addNewSkills}>+ Add More Skills</Button>
                <Button variant='outline' className='text-primary' onClick={removeSkills}>- Remove</Button>
            </div>
            
            <Button type='submit' onClick={(e)=>onSave(e)} disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
        </div>
    </div>
  )
}

export default Skills