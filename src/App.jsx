import axios from 'axios'
import { useState, useEffect } from 'react'
import CardUsers from './componets/CardUsers'
import UsersForm from './componets/UsersForm'
import './App.css'

function App() {
  
  const [users, setUsers] = useState()
  const [updateInfo, setUpdateInfo] = useState()
  const [isFormOpen, setIsFormOpen] = useState(false)

  const getAllUsers = () => {
    const URL = 'https://users-crud1.herokuapp.com/users/'
    axios.get(URL)
    .then(res => setUsers(res.data))
    .catch(err => console.log(err))

  }

  useEffect(() => {
    getAllUsers()
  }, [])


  const handleOpenForm = () => setIsFormOpen(true)

  const handleCloseForm = () => setIsFormOpen(false)


  return (
    <div className="App">
      <h1>Lista de Usuarios: </h1>
      <button onClick={handleOpenForm} >Abrir Formulario</button>
      <div className={isFormOpen ? 'form-container' : 'form-none'}>
        <UsersForm 
          getAllUsers={getAllUsers}
          updateInfo={updateInfo}
          setUpdateInfo={setUpdateInfo}
          handleCloseForm={handleCloseForm}
        />
      </div>
      <div className='card-container'>
        {
          users?.map(user => (
            <CardUsers 
              key={user.id}
              user={user}
              getAllUsers={getAllUsers}
              setUpdateInfo={setUpdateInfo}
              handleOpenForm={handleOpenForm}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
