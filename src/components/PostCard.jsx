import React from 'react'
import service from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    //$id = written like this coz its appwrite syntax
  return (
    // advantage of Link is that , we don't have to provide the full URL, it'll directly redirect from where we are.
    <Link to={`/post/${$id}`}> //we will define this route in router 
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard