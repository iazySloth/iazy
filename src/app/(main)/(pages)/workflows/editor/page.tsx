import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { db } from '@/lib/db'
import { redirect } from 'next/navigation'

type Props = {}

const Page = async (props: Props) => {
  const getWorkflowId = async () =>{
    const user = await currentUser()
    if(!user) return "USER NOT FOUND"
    const workflow = await db.workflows.findFirst({
      where: { userId: user.id },
      select: { id: true }, 
    })
    return workflow
  }
  const workflowId = await getWorkflowId()
  if (workflowId) {
    redirect(`/workflows/editor/${workflowId}`)
  }
  return <div>NO WORKFLOW FOUND.</div>
}

export default Page
