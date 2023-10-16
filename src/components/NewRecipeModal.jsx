import React from 'react'
import { IoMdClose } from 'react-icons/io'
const NewRecipeModal = ({showModal, setShowModal, name, description, image, setName, setDescription, setImage, addRecipe}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 transition-opacity duration-300 flex justify-center items-center'>
          
           
            <div className='bg-white w-1/2 h-auto p-4 rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div className='w-full flex justify-end'>
                <div className='bg-teal-400 p-3 rounded-full hover:border hover:bg-white hover:border-teal-400 transition-colors ease-in-out '>
                    <IoMdClose className='text-2xl cursor-pointer text-white hover:text-teal-400 transition-colors ease-in-out' onClick={() => setShowModal(false)}/>
                </div>
            </div>

               
               <div className='flex flex-col gap-4 p-4'>
                   <label htmlFor='name'>Name</label>
                     <input 
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-teal-500'
                        />
                </div>
                <div className='flex flex-col gap-4 p-4'>
                   <label htmlFor='description'>Description</label>
                     <textarea 
                        type='text'
                        name='description'
                        id='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-teal-500'
                        />
                </div> 
                <div className='flex flex-col gap-4 p-4'>
                   <label htmlFor='image'>Image Url</label>
                     <input 
                        type='text'
                        name='image'
                        id='image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className='border border-gray-300 rounded-md p-2 outline-none focus:ring-1 focus:ring-teal-500'
                        />
                </div>
                <div className='flex flex-col gap-4 p-4'>
                    <button 
                        className='bg-teal-500 text-white p-2 rounded-md'
                        onClick={() => addRecipe()}
                        >
                        Add Recipe
                    </button>
                </div>
            </div>

    </div>
  )
}

export default NewRecipeModal