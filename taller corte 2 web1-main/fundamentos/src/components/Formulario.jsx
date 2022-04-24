import React, { useEffect } from 'react'
import {nanoid} from 'nanoid'
import {firebase} from '../firebase'

const Formulario = () => {
    const [nombres, setnombres] = React.useState('')
    const [apellidos, setapellidos] = React.useState('')
    const [telefono, settelefono] = React.useState('')
    const [cedula, setcedula] = React.useState('')
    const [correo, setcorreo] = React.useState('')
    const [direccion, setdireccion] = React.useState('')
    const [nacionalidad, setnacionalidad] = React.useState('')
    //aqui iba listaFrutas const [listaFrutas, setListaFrutas] = React.useState([])
    const [listaformulario, setlistaformulario] = React.useState([])
    const [id, setId] = React.useState('')
    const [modoEdicion, setModoEdicion] = React.useState(false)
    const [error, setError] = React.useState(null)

    React.useEffect(()=>{
         const obtenerDatos= async () =>{
             try{
                 const db = firebase.firestore()
                 const data = await db.collection('personas').get()
                 const arrayData= data.docs.map(item => (
                     {
                         id: item.id, ... item.data()
                     }
                 ))
                 //console.log(arrayData)
                 //aqui iba setlistafrutas
                 setlistaformulario(arrayData)

             }catch(error){
                 console.log(error)
             }
         }

         obtenerDatos();
    })

    //aqui iba guardar fruta
    const guardarpersona = async (e) =>{
        e.preventDefault()

        if(!nombres.trim()){
           setError('Digite sus nombres')
            return
        }

        if(!apellidos.trim()){
            setError('Digite sus apellidos')
            return
        }

        if(!telefono.trim()){
            setError('Digite su telefono')
            return
        }

        if(!cedula.trim()){
            setError('Digite su cedula')
            return
        }

        if(!correo.trim()){
            setError('Digite su correo')
            return
        }
        
        if(!direccion.trim()){
            setError('Digite su direccion')
            return
        }

        if(!nacionalidad.trim()){
            setError('Digite su nacionalidad')
            return
        }

        try{
            const db = firebase.firestore()
            //aqui iba nueva fruta
            const nuevapersona = {

                //aqui iba nombre fruta
                persona_nombre: nombres,
                persona_apellido: apellidos,
                persona_telefono: telefono,
                persona_cedula: cedula,
                persona_correo: correo,
                persona_direccion: direccion,
                persona_nacionalidad: nacionalidad
            }
            //despues de collection iba ('frutas')
            const data = await db.collection('personas').add(nuevapersona)

            setlistaformulario([
                //aqui iba ... listaFrutas
                ... listaformulario,
                {id:nanoid(), persona_nombre: nombres, persona_apellido: apellidos, persona_telefono: telefono,
                    persona_cedula: cedula, persona_correo: correo, persona_direccion: direccion,
                     persona_nacionalidad: nacionalidad}
            ])

            e.target.reset()
            //aqui iba set frutas
            setnombres('')
            setapellidos('')
            settelefono('')
            setcedula('')
            setcorreo('')
            setdireccion('')
            setnacionalidad('')
            setError(null)
        }catch(error){
            console.log(error)
        }
        
    }

    const editar = item =>{
        setnombres(item.persona_nombre)
        setapellidos(item.persona_apellido)
        settelefono(item.persona_telefono)
        setcedula(item.persona_cedula)
        setcorreo(item.persona_correo)
        setdireccion(item.persona_direccion)
        setnacionalidad(item.persona_nacionalidad)
        setModoEdicion(true)
        setId(item.id)
    }
    //aqui iba editarFrutas
    const editarFrutas = async e =>{
        e.preventDefault()

        if(!nombres.trim()){
            setError('Digite sus nombres')
             return
         }
 
         if(!apellidos.trim()){
             setError('Digite sus apellidos')
             return
         }
 
         if(!telefono.trim()){
             setError('Digite su telefono')
             return
         }
 
         if(!cedula.trim()){
             setError('Digite su cedula')
             return
         }
 
         if(!correo.trim()){
             setError('Digite su correo')
             return
         }
         
         if(!direccion.trim()){
             setError('Digite su direccion')
             return
         }
 
         if(!nacionalidad.trim()){
             setError('Digite su nacionalidad')
             return
         }

         try{
             const db = firebase.firestore()
             await db.collection('personas').doc(id).update({
                persona_nombre: nombres,
                persona_apellido: apellidos,
                persona_telefono: telefono,
                persona_cedula: cedula,
                persona_correo: correo,
                persona_direccion: direccion,
                persona_nacionalidad: nacionalidad
             })
        
             const arrayEditado = listaformulario.map(
                item => item.id ===id ? {id:id, persona_nombre: nombres, persona_apellido: apellidos, persona_telefono: telefono,
                    persona_cedula: cedula, persona_correo: correo, persona_direccion: direccion,
                     persona_nacionalidad: nacionalidad}: item
            )
    
            setlistaformulario(arrayEditado)
            setnombres('')
            setapellidos('')
            settelefono('')
            setcedula('')
            setcorreo('')
            setdireccion('')
            setnacionalidad('')
            setId('')
            setModoEdicion(false)
            setError(null)

         }catch(error){
             console.log(error)
         }

        
    } 

    const eliminar = async id =>{
        try{
            const db = firebase.firestore()
            await db.collection('personas').doc(id).delete()
            const aux = listaformulario.filter(item => item.id !== id)
            set(aux)
        }catch(error){
            console.log(error)
        }

        
    }

    const cancelar = () =>{
        setModoEdicion(false)
        setFruta('')
        setId('')
        setDescripcion('')
        setError(null)
    }

  return (
    <div className='container mt-5'>
        <h1 className='text-center'>CRUD BÁSICO</h1>
        <hr/>
        <div className='row'>
            <div className='col-8'>
                <h4 className='text-center'>Listado de Frutas</h4>
                <ul className='list-group'>
                    {
                        listaFrutas.map(item=>(
                            <li className='list-group-item' key={item.id}>
                                <span className='lead'>{item.nombreFruta}-{item.nombreDescripcion}</span>
                                <button className='btn btn-danger btn-sm float-end mx-2' onClick={()=> eliminar(item.id)}>
                                Eliminar
                                </button>
                                <button className='btn btn-warning btn-sm float-end'onClick={()=>editar(item)}>
                                Editar
                                </button>
                            </li>    
                        ))
                    }
                </ul>
            </div>
            <div className='col-4'>
                <h4 className='text-center'>
                    {
                        modoEdicion ? 'Editar Frutas' : 'Agregar Frutas'
                    }
                    </h4>
                <form onSubmit ={modoEdicion ? editarFrutas: guardarFrutas}>
                    {
                        error ? <span className='text-danger'>{error}</span> : null
                    }
                    <input 
                    className='form-control mb-2'
                    type = "text"
                    placeholder='Ingrese Fruta'
                    onChange={(e)=> setFruta(e.target.value)}
                    value = {fruta}
                    />
                    <input 
                    className='form-control mb-2'
                    placeholder='Ingrese Descripción'
                    type="text"
                    onChange={(e)=> setDescripcion(e.target.value)}
                    value={descripcion}
                    />

                    {
                        modoEdicion ?
                        (
                            <>
                                <button 
                                className='btn btn-warning btn-block'
                                type='submit'
                                >Editar</button>
                                <button 
                                className='btn btn-dark btn-block mx-2'
                                onClick={() => cancelar()}
                                >Cancelar</button>
                            </>
                        )
                        :

                            <button 
                            className='btn btn-primary btn-block'
                            type='submit'
                            >Agregar</button>

                        }
                </form>
            </div>
        </div>
    </div>
  )
}

export default Formulario