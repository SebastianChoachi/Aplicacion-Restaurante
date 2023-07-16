import './App.css';
import React, { useEffect, useState } from 'react';
import { db } from "./Firebase/firebase"
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { Form, Card, Button, Modal } from 'react-bootstrap';
import BannnerComponent from './BannerComponent';
import FooterComponent from './FooterComponent';

function App() {

  const [users, setUsers] = useState([])
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [num, setNum] = useState(0)
  const [date, setDate] = useState(null)


  const refCollection = collection(db, 'reservaciones')

  //FORM
  const [formulario, setFormulario] = useState(false)
  const [item, setItem] = useState(null)

  const getUsers = async () => {
    const data = await getDocs(refCollection, { nombre: name, correo: mail, cantidad: num, date: date })
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
  }

  const createUser = async () => {
    await addDoc(refCollection, { nombre: name, correo: mail, cantidad: num, date: date })
    getUsers()
  }


  const borrarUser = async (id) => {
    const userDoc = doc(refCollection, id)
    await deleteDoc(userDoc)
    getUsers();
  }


  const formUpdateOpen = (data) => {
    setFormulario(true)
    setItem(data)
  }
  const formUpdateClose = () => {
    setFormulario(false)
  }

const handleChange = (e) => {
setItem({
  ...item, [e.target.name]: e.target.value
})
}


  const updateUser = async (id) => {
    await updateDoc(doc(refCollection, id), item)
    getUsers()
    formUpdateClose()
  }

  useEffect(() => {
    getUsers();
  }, [])

  return (
    <div className="App">
      <header>
        <div className='App-header'>
          <BannnerComponent></BannnerComponent>
        </div>
      </header>
      <body className="body">
      <Form className="form">
        <h3 className='text-uppercase fw-bold '>Reservaciones</h3>
       
        <Form.Control type="text" placeholder='Nombre' onChange={(e) => { setName(e.target.value) }} />
        <Form.Control type="text" placeholder='Correo' onChange={(e) => { setMail(e.target.value) }} />
        <Form.Control type="text" placeholder='Num personas' onChange={(e) => { setNum(e.target.value) }} />
        <Form.Control type="date" onChange={(e) => { setDate(e.target.value) }} />
        <br></br> 
        <Button style={{marginBottom:'2%'}} variant="primary" onClick={createUser}>Enviar</Button>
      </Form>
      
      <div className="reservas">
      {users.map((item) => {
        return (
          <div key={item.id}>
            <Card style={{ width: '30rem', marginTop:'3%' }}>
              <Card.Body> 
                <Card.Title>Nombre: {item.nombre}</Card.Title>
                <Card.Text>Correo: {item.correo}</Card.Text>
                <Card.Text>Num Personas: {item.cantidad}</Card.Text>
                <Card.Text>Fecha: {item.date}</Card.Text>
                <Button className="boton" variant="dark" onClick={() => formUpdateOpen(item)}>Editar</Button>
                <Button className="boton" variant="danger" onClick={() => borrarUser(item.id)}>Eliminar</Button>
              </Card.Body>
            </Card>
            
          </div>
        )
      })
      }
      </div>
      {
        formulario && (
          <Modal  show={formulario} onHide={formUpdateClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar Reservacion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder='Nombre' value={item.nombre} name="nombre" onChange={handleChange}/>
              <Form.Label>Correo</Form.Label>
              <Form.Control type="text" placeholder='Correo'value={item.correo} name="correo" onChange={handleChange}/>
              <Form.Label>Num de Personas</Form.Label>
              <Form.Control type="text" placeholder='Num personas'value={item.cantidad} name="cantidad" onChange={handleChange}/>
              <Form.Label>Fecha</Form.Label>
              <Form.Control type="date" value={item.date} name="date" onChange={handleChange}/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="primary" onClick={()=>updateUser(item.id)}>Enviar</Button>
            </Modal.Footer>
          </Modal>
        )
      }
      </body>
      <footer>
        <FooterComponent></FooterComponent>
      </footer>
    </div>
  );
}

export default App;
