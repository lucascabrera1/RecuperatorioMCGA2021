import React from 'react'
import { useSelector} from 'react-redux'

function NationList() {
    const nations = useSelector(state => state.nations)
  
  return (
    <div className='w-15/1 bg-red-100'>
        <div className='grid grid-cols-3 gap-5 self-center'>
          {nations.map( nation => (
              <div key={nation.id} className='bg-neutral-800 p-1 rounded-md'>
                  <header className='rounded-sm place-self-center' >
                    <p>id: {nation.id}</p>
                    <p>nombre: {nation.name}</p>
                  </header>
              </div>
          ))}
        </div>
    </div>
  )
}

export default NationList