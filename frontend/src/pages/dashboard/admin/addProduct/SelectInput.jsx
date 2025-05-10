
const SelectInput = ({ label, name, value, onChange, options }) => {
    return (
        <div>
            <label htmlFor={name} className='block text-sm font-medium text-gray-700'>
                {label}
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="cursor-pointer mt-1 block py-2.5 px-4 w-full rounded-md bg-gray-100 border border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
                {options.map((option, index) => (
                    <option key={index}
                        value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectInput