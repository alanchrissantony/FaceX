import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
    <div className='my-6'>
        <h2 className='font-bold text-sm text-center mb-2' style={{color:resumeInfo?.themeColor}}>Professional Experience</h2>
        <hr style={{borderColor:resumeInfo?.themeColor}}/>
        {resumeInfo?.experience.map((experience, index)=>(
          <div key={index} className='my-5'>
            <h2 className='font-bold text-sm' style={{color:resumeInfo?.themeColor}}>{experience?.title}</h2>
            <h2 className='flex text-xs justify-between'>{experience?.companyName}, {experience?.city}, {experience.state}
              <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate}</span>
            </h2>
            <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummary}}></div>
          </div>
        ))}
    </div>
  )
}

export default ExperiencePreview