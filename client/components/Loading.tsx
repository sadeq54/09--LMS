import { Loader2 } from 'lucide-react'
import React from 'react'

export default function Loading() {
    return (
        <div className='loading'>
            <Loader2  className='loading__spinner'/>
            <span className='loading__text'>Loading...</span>
        </div>
    )
}
