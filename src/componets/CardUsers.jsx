import axios from 'axios'
import React from 'react'

const CardUsers = ({user, getAllUsers, setUpdateInfo, handleOpenForm}) => {

  const deleteUser = () => {
    const URL = `https://users-crud1.herokuapp.com/users/${user.id}/`
    axios.delete(URL)
    .then(res => {
      console.log(res.data)
      getAllUsers()
    })
    .catch(err => console.log(err))
  }

  const handleUpdateClick = () => {
    setUpdateInfo(user)
    handleOpenForm()
  }

  return (
    <article className='card'>
      <h2 className='card__tittle'>{user.first_name}  {user.last_name}</h2>
      <hr className='card__hr' />
      <ul className='card__list'>
        <li className='card__item'>Correo: <span className='card__span'>{user.email}</span></li>
        <li className='card__item'>Contraseña: <span className='card__span'>{user.password}</span></li>
        <li className='card__item'>Fecha de Nacimiento: <span className='card__span'>{user.birthday}</span></li>
      </ul>
      <footer className='card__footer'>
        <button onClick={deleteUser} className='card__btn'>Delete</button>
        <button onClick={handleUpdateClick} className='card__btn'>Update</button>
      </footer>
    </article>
  )
}

export default CardUsers