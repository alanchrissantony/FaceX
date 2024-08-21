import { Loader2Icon, MoreVertical, Notebook } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import GlobalApi from '@/GlobalApi'
import { toast } from 'sonner'

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate()
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigation=(url)=>{
    navigate(url)
  }

  const onDelete=(id)=>{
    setLoading(true)
    GlobalApi.DeleteUserResumes(id).then((response)=>{
      setLoading(false)
      setOpenAlert(false)
      toast('Resume deleted!')
      refreshData()
      
    }, (error)=>{
      setLoading(false)
    })
  }
  return (
      <div className='hover:scale-105 transition-all'>
        <Link to={`/resume/${resume.resumeId}/edit`}>
        <div className="p-14 bg-gradient-to-b from-gray-200 via-white to-gray-200 flex items-center justify-center h-[280px] border rounded-t-lg 
        hover:shadow-md shadow-primary ">
          <Notebook />
        </div>
        </Link>
        <div className='border p-3 flex justify-between  text-white rounded-b-lg shadow-lg'
          style={{
            background: resume?.themeColor
          }}>
          <h2 className='text-center my-1'>{resume.title}</h2>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className='h-4 w-4 cursor-pointer' />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={()=>{navigation(`/resume/${resume.resumeId}/edit`)}}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{navigation(`/my-resume/${resume.resumeId}/view`)}}>View</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{navigation(`/my-resume/${resume.resumeId}/view`)}}>Download</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>setOpenAlert(true)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={openAlert}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your resume
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={()=>setOpenAlert(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={()=>onDelete(resume.resumeId)} disabled={loading}>{loading? <Loader2Icon className='animate-spin'/>:'Delete'}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
  )
}

export default ResumeCardItem