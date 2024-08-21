import { AiChatSession } from '@/AiModel'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Brain, LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { BtnBold, BtnBulletList, BtnItalic, BtnLink, BtnNumberedList, BtnStrikeThrough, BtnUnderline, Editor, EditorProvider, Separator, Toolbar } from 'react-simple-wysiwyg'
import { toast } from 'sonner'

function RichTextEditor({onRichTextEditorChange, index, defaultValue}) {
    const prompt = `Job Title: {positionTitle}. Based on the job title, provide a summary for my experience in the resume using the following format:
{
    summary: "Brief summary of work experience tailored to the job title."
}
Generate the summary according to the job title: {positionTitle}.
`;
    const [value, setValues] = useState(defaultValue)
    const [loading, setLoading] = useState(false)
    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)

    const GenerateSummeryAi = async()=>{
        
        if(!resumeInfo?.experience[index]?.title){
            toast('Please Add Position Title')
            return
        }
        setLoading(true)
        try {
            const PROMPT = prompt.replace('{positionTitle}', resumeInfo?.experience[index].title)
            const result = await AiChatSession.sendMessage(PROMPT);
            const responseText = result.response.text();
            const response = JSON.parse(responseText);

            setValues(response.summary);
            
        } catch (error) {
            console.error("Error parsing the AI response:", error);
            setValues("Error: An error occurred while processing the AI response.");
        }
        setLoading(false)
    }

  return (
    <div>
        <div className='flex justify-between my-2'>
            <label className='text-xs'>Summary</label>
            <Button onClick={GenerateSummeryAi} size='sm' className='flex gap-2 border-primary text-primary' variant='outline' disabled={loading}>{loading?<LoaderCircle className='animate-spin'/>:<><Brain className='h-4 w-4'/>Generate from AI</>}</Button>
        </div>
        <EditorProvider>
            <Editor value={value} onChange={(e)=>{
            setValues(e.target.value);
            onRichTextEditorChange(e)
        }}>
                <Toolbar>
                    <BtnBold/>
                    <BtnItalic/>
                    <BtnUnderline/>
                    <BtnStrikeThrough/>
                    <BtnLink/>
                </Toolbar>
            </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor