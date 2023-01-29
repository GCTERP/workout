import { useState } from "react";
import Select from "react-select";

const MultiSelectBar = ({ fieldName, options, selectedData }) => {
        
    const name = fieldName;

    return ( 
        <>
            <div className="pl-10">
                <div className='flex items-center justify-start pl-6'>
                    <div className='-mb-2.5 z-10'>
                        <span className='bg-white text-opacity-80 text-blue-500 text-sm px-0.5'>{name}</span>
                    </div>
                </div>
                <Select styles={{
                    control: (base) => ({
                        ...base,
                        minHeight: '50px',
                        height: '50px',
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        overflowX: 'scroll',
                        flexWrap: 'unset',
                        height: '50px',
                    }),
                    multiValue: (base) => ({
                        ...base,
                        flex: '0 0 auto',
                    })
                    }} 
                    className="w-6/12 text-sm " 
                    maxMenuHeight={250} 
                    options={options} 
                    isClearable={false} 
                    onChange={selectedData} 
                    isMulti 
                    placeholder="Please enter a tag" 
                />
            </div>
        </>
    );
}
 
export default MultiSelectBar;