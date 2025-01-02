import { useEffect, useState } from "react"

export default function Test(){
    const[name,setName] = useState('')
    const[email,setEmail] = useState('')
    const[filt,setFiltrer] = useState('')
    const [etudiants,setEtudiants] = useState([])
    const getEtudiants = async()=>{
        const response = await fetch('http://localhost:3001/etudiants')
        const data = await response.json()
        if(!response.ok){
            alert('aucun response')
        }else{

            setEtudiants(data)
        }
    }
    useEffect(()=>{
        getEtudiants()
    },[])
    const Add = (e)=>{
        e.preventDefault()
        const newEtudiant = {
            id:etudiants.length + 1,
            fullname:name,
            email_adress:email,
        }
        setEtudiants(...etudiants,newEtudiant)
        setName('')
        setEmail('')
    }
    const deleteList = (index)=>{
        const update = etudiants.filter((_,i)=>i!==index)
        setEtudiants(update)
    }
    const All = ()=>{
        const etudiantsAfficher = filt.trim()?etudiants.filter((etd)=>{
            return etd.id.toString().includes(filt)
        }):etudiants;
        if(etudiantsAfficher.length===0){
            return                 <tr>
            <td colSpan={4} align="center">Aucun Resultat</td>
        </tr>
        }
        return etudiantsAfficher.map((etd)=>{
            return <tr key={etd.id}>
                    <td>{etd.id}</td>
                    <td>{etd.fullname}</td>
                    <td>{etd.email_adress}</td>
                    <td><button onClick={()=>deleteList(index)} className="btn btn-danger">Delete</button></td>
                </tr>
        })
    }

    return(
        <div className="container">
            <h1>Listes des Etudiants : </h1>           
             <form>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="Full Name" />
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email Address" />
                    <button className="btn btn-success" onClick={Add}>Ajouter</button>
                    <input type="text" value={filt} onChange={(e)=>setFiltrer(e.target.value)} placeholder="Filtrage" />
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#ID</th>
                        <th>Full Name</th>
                        <th>Email Address</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                        {All()}
                </tbody>
            </table>
        </div>
    )
}