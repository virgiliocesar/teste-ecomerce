import React from 'react'

const TextInput = ({ label, name, value, onChange, type = "text", placeholder }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
                {label}
            </label>
            <input type={type} name={name} id={name} placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="mt-1 block py-2.5 px-4 w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
        </div>
    )
}

export default TextInput