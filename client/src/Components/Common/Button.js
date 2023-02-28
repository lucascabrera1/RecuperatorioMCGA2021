export default function Button({type = "button", label, onClick, className ='bg-indigo-600 px-2 py-1', children}) {
    return (
        <button type={type} onClick={onClick} className={className}>{children}</button>
    )
    
}