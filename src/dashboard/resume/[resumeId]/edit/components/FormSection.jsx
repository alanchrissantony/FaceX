import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Navigate, useParams } from 'react-router-dom'


function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1)
    const [enabledNext, setEnabledNext] = useState(false)
    const params = useParams()
  return (
    <div>
        <div className='flex justify-between items-center'>
            <Button variant='outline' className='flex gap-2' size='sm'><LayoutGrid/> Theme</Button>
            <div className='flex gap-2'>
                {activeFormIndex>1 && <Button size='sm' onClick={(e)=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft/></Button>}
                <Button disabled={!enabledNext} className='flex gap-2' size='sm' onClick={(e)=>setActiveFormIndex(activeFormIndex+1)}>Next <ArrowRight/></Button>
            </div>
        </div>
        {/* Personal Details */}
            {activeFormIndex==1?<PersonalDetails enabledNext={(v)=>setEnabledNext(v)}/>:null}
        {/* Summary */}
            {activeFormIndex==2?<Summary enabledNext={(v)=>setEnabledNext(v)}/>:null}
        {/* Professional Experiance */}
            {activeFormIndex==3?<Experience enabledNext={(v)=>setEnabledNext(v)}/>:null}
        {/* Education */}
            {activeFormIndex==4?<Education enabledNext={(v)=>setEnabledNext(v)}/>:null}
        {/* Skills */}
            {activeFormIndex==5?<Skills enabledNext={(v)=>setEnabledNext(v)}/>:null}
        {/* View */}
        {activeFormIndex==6?<Navigate to={`/my-resume/${params.resumeId}/view`} />:null}
    </div>
  )
}

export default FormSection