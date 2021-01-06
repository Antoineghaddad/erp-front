import React , {useState} from 'react'
import { useModal } from "react-modal-hook";
import ReactModal from "react-modal";
import Axios from 'axios';


const Modal = (props) => {
    const [newfirstName, setNewfirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newlastnameErr, setnewLastnameErr] = useState('');
    const [newemailErr, setnewEmailErr] = useState('');
    const [newfirstnameErr, setnewFirstnameErr] = useState('');
    const [newimageErr, setnewImageErr] = useState('');
    const [render, setRender] = useState(false);
    const [successUpdate, setSuccessUpdate] = useState('');


    console.log(newfirstName);

    const updateInfo = async (id) => {
        // if (!newfirstName && !newLastName && !newEmail && !newImage) {
        //     setnewFirstnameErr('Firstname is Required!');
        //     setnewLastnameErr('Lastname is Required!');
        //     setnewEmailErr('Email is Invalid!');
        //     setnewImageErr('Image is required!')
        // } else if (newfirstName && !newLastName && !newEmail && !newImage) {
        //     setnewFirstnameErr('');
        //     setnewLastnameErr('Lastname is Required!');
        //     setnewEmailErr('Email is Invalid!');
        //     setnewImageErr('Image is required!')
        // } else if (!newfirstName && newLastName && !newEmail && !newImage) {
        //     setnewFirstnameErr('Firstname is Required!');
        //     setnewLastnameErr('');
        //     setnewEmailErr('Email is Invalid!');
        //     setnewImageErr('Image is required!')
        // } else if (!newfirstName && !newLastName && newEmail && !newImage) {
        //     setnewFirstnameErr('Firstname is Required!');
        //     setnewLastnameErr('Lastname is Required!');
        //     setnewEmailErr('');
        //     setnewImageErr('Image is required!')
        // } else if (!newfirstName && newLastName && !newEmail && newImage) {
        //     setnewFirstnameErr('Firstname is Required!');
        //     setnewLastnameErr('Lastname is Required!');
        //     setnewEmailErr('Email is Invalid!');
        //     setnewImageErr('')
        // } else if (!newEmail.includes('@') && !newEmail.includes('.com')) {
        //     setnewEmailErr('Please enter a valid email address');
        // } else {
           
            const data = new FormData();
            data.append('firstname', newfirstName)
            data.append('lastname', newLastName)
            data.append('email', newEmail)
            data.append('image', newImage)
            console.log(Object.values(data));
            try {
                await Axios.post(`http://localhost:8000/api/users/${id}?_method=PUT `, data, {
                    headers: {

                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem('token')
                    }
                }).then((response) => {
                    console.log(response);
                    setRender(!render);
                    setSuccessUpdate('Data has been updated');
                    setnewFirstnameErr('');
                    setnewLastnameErr('');
                    setnewEmailErr('');
                    setnewImageErr('');
                })
            } catch (err) { console.log(err) }
        // }

    }
    const [showModal, hideModal] = useModal(() => (
        <ReactModal ariaHideApp={false} isOpen>
            
            <center>
            <div>
           <p> Username:{props.data.username}</p>
           <p> Firstname: {props.data.firstname}</p>
           <p> Lastname:{props.data.lastname}</p>
           <p> Email:{props.data.email}</p>
           </div>
           </center>


                                    <div className="update-form">     
                                    {newfirstnameErr ? <div className="alert alert-danger">{newfirstnameErr}</div> : ""}
                                    <div>
                                    <label>Firstname</label>
                                    <input className="form-control" type="text" placeholder="enter firstname" onChange={(e) => { setNewfirstName(e.target.value); }} />
                                    {newlastnameErr ? <div className="alert alert-danger">{newlastnameErr}</div> : ""}
                                    <label>Lastname</label>
                                    <input type="text" className="form-control" placeholder="enter lastname" onChange={(e) => { 
                                        setNewLastName(e.target.value);
                                    }} />
                                    {newemailErr ? <div className="alert alert-danger">{newemailErr}</div> : ""}
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="enter email" onChange={(e) => { setNewEmail(e.target.value);
                                    }} />
                                    {newimageErr ? <div className="alert alert-danger">{newimageErr}</div> : ""}<br></br>
                                    <label>Image
                                    <input className="form-control" type="file" name="image" id="image" placeholder="Enter your Address" onChange={(e) => { setNewImage(e.target.files[0]); console.log(e.target.files[0]) }} /></label><br></br>
                                    <button id="change1" className="Button" onClick={() => { updateInfo(props.data.id) }}>Edit</button>
                                    </div>

                                    </div>
 
          <button onClick={hideModal}>Close</button>
        </ReactModal>
      ));
    return (
        
        <div>
                            <button id="change2" onClick={showModal}>Update</button>
            
        </div>
    )
}

export default Modal
