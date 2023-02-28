import React from 'react'

function Input({type, 
    classname,
    disabled = false,
    name, 
    label, 
    register, 
    registerOptions, 
    errors, 
    optionMsgErrors,
    onBlur
    }){
  return (
    <div>
        <label>{label}</label>
        <input 
            type={type} 
            placeholder={label}
            className={classname}
            name={name}
            {...register(name, registerOptions)}
            disabled = {disabled}
            onBlur = {onBlur}
        />
        {errors[name]?.type === "required" && <span style={{color: "red"}} >{optionMsgErrors.required}</span>}
        {errors[name]?.type === "minLength" && <span style={{color: "red"}} >{optionMsgErrors.minLength}</span>}
        {errors[name]?.type === "maxLength" && <span style={{color: "red"}} >{optionMsgErrors.maxLength}</span>}
        {errors[name]?.type === "pattern" && <span style={{color: "red"}} >{optionMsgErrors.pattern}</span>}
        {errors[name]?.type === "min" && <span style={{color: "red"}} >{optionMsgErrors.min}</span>}
        {errors[name]?.type === "max" && <span style={{color: "red"}} >{optionMsgErrors.max}</span>}
    </div>
  )
}

export default Input