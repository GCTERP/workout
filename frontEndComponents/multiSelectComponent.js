import React, { useState } from 'react'

const MultiSelect = props => {
  const fieldName = props.fieldName;
	const [tags, setTags] = useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.selectedTags([...tags, event.target.value]);
			event.target.value = "";
		}
	};
	return (
    <div>
    <div className='flex items-center justify-start pl-12'>
      {/* <div className='pl-5'> */}
      <div className='-mb-3 z-10'>
        <span className='bg-white text-opacity-80 text-blue-500 text-sm pl-1.5'>{fieldName}</span>
      </div>
    </div>
    <div className='items-center justify-start pl-8 flex'>
        <div className="items-start flex tags-input w-2/5 min-h-max rounded-md max-h-14 px-2 focus:ring-1 border-2 hover:border-blue-500 active: outline-blue-500 box-border overflow-x-auto overscroll-x-contain hover:xs scrollbar-hide"> 
          <ul id="tags" className='flex p-0 mt-2 ml-0 mb-0 mr-0'>
            {tags.map((tag, index) => (
              <li key={index} className="tag w-auto h-8 flex items-center justify-center text-gray-800 text-sm rounded-md bg-slate-200 px-2 list-none mr-2 mb-2 mt-0 ml-0	">
                <span className='tag-title mt-0.5'>{tag}</span>
                {/* <span className='tag-close-icon block w-4 h-4 leading-4 text-center text-sm ml-2 text-blue-700 cursor-pointer rounded-full bg-white'
                  onClick={() => removeTags(index)}
                >
                  X
                </span> */}
                <span className='tag-close-icon block pl-2' onClick={() => removeTags(index)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>


                </span>
              </li>
            ))}
          </ul>
          <div className='flex-wrap flex'>
            <input
              type="text"
              onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
              placeholder="Press enter to add tags"
            //   className='mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1 '
            className='h-12 text-sm "border-none w-96 pt-1 focus:outline-none focus: outline-transparent transition duration-200'
            />
            {/* <span className="bg-white text-opacity-80 text-sm absolute text-blue-500 py-2 px-2 transition duration-200 input-text">Register Number</span> */}
          </div>
        </div>
      <div className='p-2'>
        <button className="flex bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">
          <div className='tag-add-icon flex pr-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>  
          Add 
        </button>
      </div>
      </div>
    </div>
    
	);
};
export default MultiSelect;