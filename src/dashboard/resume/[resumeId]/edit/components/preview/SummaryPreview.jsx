import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div>
        <p className='text-xs'>{resumeInfo?.summary}</p>
    </div>
  )
}

export default SummaryPreview