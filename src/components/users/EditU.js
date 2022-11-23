import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditU() {
    const { id } = useParams()
    let history = useNavigate()
    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: "",
    })
    const { name, email, contact } = user
    const onInputChange = (event) => {
        setUser({
            ...user, [event.target.name]: event.target.value
        })
    }
    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:3002/users/${id}`, user)
        history("/")
    }
    const loadUser = async () => {
        const result = await axios.get(`http://localhost:3002/users/${id}`)
        setUser(result.data)
    }
    useEffect(() => {
        loadUser()
    }, [])
    return (
        <div>
            <div className="container my-4 form">
                <h1 className="text-center">Edit Your Profile</h1>
                <div className="container">
                    <form onSubmit={event => onSubmit(event)}>

                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Name</label>
                            <input type="text" name="name" value={name} onChange={(event) => onInputChange(event)} className="form-control" id="exampleInputPassword1" />
                        </div>
                        <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" name="email" value={email} onChange={(event) => onInputChange(event)} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                        </div>
                        <div className="mb-3">
                            <label for="exampleInputPassword1" className="form-label">Phone No.</label>
                            <input type="tel" value={contact} name="contact" onChange={(event) => onInputChange(event)} max="10" min="10" className="form-control" id="exampleInputPassword1" />
                        </div>

                        <button type="submit" className="btn btn-outline-primary">Update Profile</button>
                    </form>

                </div>
            </div>
        </div>
    )
}
