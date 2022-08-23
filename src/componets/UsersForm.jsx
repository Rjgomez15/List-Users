import axios from 'axios'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

  const defaultValue = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    birthday: ''

  }

const UsersForm = ({getAllUsers, updateInfo, setUpdateInfo, handleCloseForm}) => {

  useEffect(() => {
    if(updateInfo){
      reset(updateInfo)
    }
  }, [updateInfo])
  


  const createUser = data => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.post(URL, data)
      .then(res => {
        console.log(res.data);
        getAllUsers()
      })
      .catch(err => console.log(err))
    }


  const updateUser = data => {
    const URL = `https://users-crud1.herokuapp.com/users/${updateInfo.id}/`
    axios.patch(URL, data)
    .then(res => {
      console.log(res.data);
      getAllUsers()
    })
    .catch(err => console.log(err))
  } 

  const {register, reset, handleSubmit} = useForm()

  const submit = data => {
    if(updateInfo){
      //Actualizar Usuario
      updateUser(data)
      setUpdateInfo()
    } else {
      //Crear un Nuevo Usuario
    createUser(data);
    }
    reset(defaultValue)
    handleCloseForm()
  }


  return (
    <form onSubmit={handleSubmit(submit)} className='form'>
      <div onClick={handleCloseForm} className='form_equis'>X</div>
      <h2 className='form__tittle'>
        {updateInfo 
          ? 
            'Cambiar Información de Usuario' 
          : 
            'Crear un Nuevo Usuario' 
        }
      </h2>
      <ul className='form__list'>
        <li className='form__item'>
          <label htmlFor="name">Nombre: </label>
          <input {...register("first_name")} type="text" id='name' placeholder='Ingrese su Nombre' /> 
        </li>
        <li className='form__item'>
          <label htmlFor="lastname">Apellido: </label>
          <input {...register("last_name")} type="text" id='lastname' placeholder='Ingrese su Apellido' /> 
        </li>
        <li className='form__item'>
          <label htmlFor="email">Correo: </label>
          <input {...register("email")} type="email" id='email' placeholder='Ingrese su Email' /> 
        </li>
        <li className='form__item'>
          <label htmlFor="pass">Contraseña: </label>
          <input {...register("password")} type="text" id='pass' placeholder='Ingrese una Contraseña' /> 
        </li>
        <li className='form__item'>
          <label htmlFor="birthday">Fecha de Nacimiento: </label>
          <input {...register("birthday")} type="text" id='birthday' placeholder='AAAA-MM-DD' /> 
        </li>
      </ul>
      <button className='form__btn'>{updateInfo ? 'Actualizar' : 'Crear'}</button>
    </form>
  )
}

export default UsersForm