import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteUser } from '../feautures/users/userSlice'

function UsersList() {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    
    const handleDelete = id => {
      dispatch(deleteUser(id))
    }

  return (
    <div className='w-4/6 bg-red-100'>
      <header className='flex justify-between items-center py-4'>
      <h1>Users List {users.length}</h1>
        <div className='grid grid-cols-3'>
          {users.map( user => (
              <div key={user.id} className='bg-neutral-800 p-4 rounded-md'>
                  <header className='flex gap-x-2'>
                    <h3>{user.Nombre} {user.Apellido} {user.Dni}</h3>
                    <div className='flex justify-between'>
                    <Link 
                        to={`/edit-user/${user.id}`} 
                        className='bg-zinc-600 px-2 py-1 text-xs rounded-md'> Edit
                      </Link>
                      <button 
                        onClick={()=> handleDelete(user.id)}
                        className = 'bg-red-500 px-2 py-1 text-sm rounded-md'
                      >Delete user</button>
                    </div>
                  </header>
              </div>
          ))}
        </div>
      </header>
    </div>
  )
}

export default UsersList