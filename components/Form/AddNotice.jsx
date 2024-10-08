import React, { useState } from 'react'
import Spinner from '../ui/Spinner';

const AddNotice = ({ Notice, setNotice, HandleSubmit, Loading }) => {

    const [FileUpload, setFileUpload] = useState(null);

    const HandleChange = (e) => {
        setNotice({ ...Notice, [e.target.name]: e.target.value })
    }


    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setNotice({ ...Notice, url: reader.result })
        };
        reader.onerror = (error) => {
            console.error('Error converting file to Base64:', error);
        };
    };

    const handleFileInputChange = async (event) => {
        // setIsCompressing(true)
        const file = event.target.files[0];
        convertToBase64(file)
            // setIsCompressing(false)
            ;

    };

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Add Notice
                </h3>
            </div>
            <div>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Title
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={Notice.title}
                                onChange={HandleChange}
                                placeholder="Enter text here"
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="w-full ">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Attach file
                            </label>
                            <input
                                type="file"
                                onChange={handleFileInputChange}
                                className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                            />
                        </div>
                        <div className="mb-4.5">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={Notice.date}
                                onChange={handleFileInputChange}
                                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            />
                        </div>

                    </div>
                    <button onClick={HandleSubmit} className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                        {Loading && <Spinner />}   Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddNotice