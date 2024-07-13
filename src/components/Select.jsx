import React, {useId} from 'react'

//forward is mentioned while exporting component.
function Select({
    options,
    label,
    className,
    ...props
}, ref) {
    const id = useId()
  return (
    <div className='w-full'>
        {label && <label htmlFor={id} className=''></label>}
        <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        >
            {/* if there is no value in options, app will crash. Solution: we will loop optionally using ?.map syntax. if  there's any value inside options then it'll map otherwise it won't. */}
            {options?.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

//another way of writing forwardRef.
export default React.forwardRef(Select)