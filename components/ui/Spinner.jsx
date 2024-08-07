import React from 'react'

const Spinner = () => {
    return (

        <div className=" mr-2 animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-base rounded-full dark:text-blue-500" role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
        </div>


    )
}

export default Spinner