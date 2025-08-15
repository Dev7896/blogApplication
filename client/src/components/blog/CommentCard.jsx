import React from 'react'
import { CircleUser } from 'lucide-react'

function CommentCard({comment}) {
  return (
    <div className='mt-6 px-8 py-4 w-full  bg-slate-200 font-semibold rounded-lg items-center'>
      <article className='flex gap-4'>
        <CircleUser />
        <p>{comment.user}</p>
      </article>
      <p className='mt-2 pl-8'>{comment.comment}</p>
    </div>
  )
}

export default CommentCard
