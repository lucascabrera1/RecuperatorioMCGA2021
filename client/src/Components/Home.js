import React from 'react'
import {Link} from 'react-router-dom'

function Home() {
  return (
    <div>
        <h1>Examen Recuperatorio</h1>
        <h2>Modelos Computaionales de Gestión Administrativa</h2>
        <h2>Lucas Gabriel Cabrera</h2>
        <h3>Para rendir en el primer llamado de la mesa de febrero - marzo 2023</h3>
        <Link to='/users'>Ir a la gestión de usuarios</Link>
    </div>
  )
}

export default Home