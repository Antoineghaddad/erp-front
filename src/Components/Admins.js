import Axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Sidenav from './Sidenav';
import Pagination from './Pagination';




const Admins = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [newfirstName, setNewfirstName] = useState('');
    const [newLastName, setNewLastName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newImage, setNewImage] = useState('');
    const [users, setUsers] = useState([]);
    const [render, setRender] = useState();
    const [lastnameErr, setLastnameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [firstnameErr, setFirstnameErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [success, setSuccess] = useState('');
    const [successUpdate, setSuccessUpdate] = useState('');
    const [imageErr, setImageErr] = useState('');
    const [newlastnameErr, setnewLastnameErr] = useState('');
    const [newemailErr, setnewEmailErr] = useState('');
    const [newfirstnameErr, setnewFirstnameErr] = useState('');
    const [newimageErr, setnewImageErr] = useState('');
    const [infoErr, setInfoErr] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [progress, setProgess] = useState(0);
    const [sortBy, setSortBy] = useState(false);


    const toggleDisplay = () => {
        setSortBy(!sortBy);
    }



    const numOfAdmins = users.length;

    useEffect(() => {
        Axios.get('http://localhost:8000/api/users', {
            headers: {
                'content-type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('token')
            }
        }).then((response) => {
            setUsers(response.data);
            setLoading(false);
        })
    }, [render])

    useEffect(() => {
        setFilteredData(
            users.filter((user) =>
                user.firstname.toLowerCase().includes(search.toLowerCase()) || user.lastname.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase())
            ));
    }, [search, users, render]);

    useEffect(() => {
        localStorage.getItem('image');
        console.log(localStorage.getItem('image'))
    }, [])

    useEffect(() => {
        localStorage.getItem('id');
        console.log(localStorage.getItem('id'))

    }, [])

    useEffect(() => {
        localStorage.getItem('username');
        console.log(localStorage.getItem('username'))

    }, [])

    const indexOfLastPost = currentPage * postsPerPage;
    // console.log("indexOfLastPost: ", indexOfLastPost);

    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    // console.log("indexOfFirstPost: ", indexOfFirstPost);

    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    };
    console.log("currentPosts: ", currentPosts);

    const handleAdd = async (e) => {
        e.preventDefault();
        setProgess(0)
        const data = new FormData();
        data.append('firstname', firstName)
        data.append('lastname', lastName)
        data.append('email', email)
        data.append('image', image);
        data.append('username', userName)
        data.append('password', password)
        try {
            await Axios.post('http://localhost:8000/api/register', data, {
                headers: {
                    'content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                },
                onUploadProgress: (ProgressEvent) => {
                    let progress = Math.round(
                        ProgressEvent.loaded / ProgressEvent.total * 100) + '%';
                    setProgess(progress);
                }
            }).then((response) => {
                console.log(response.data);
                localStorage.getItem('token');
                setLoading(false);
                setUsers([
                    ...users, {
                        firstname: firstName,
                        lastname: lastName,
                        email: email,
                        image: image,
                        username: userName,
                        password: password
                    }])
                setSuccess('Data has been inserted');
                setFirstnameErr('');
                setLastnameErr('');
                setEmailErr('');
                setUsernameErr('');
                setPassErr('');
                setImageErr('');


            })
        } catch (error) {

            if (error.response.data.error.firstname && error.response.data.error.lastname && error.response.data.error.email && error.response.data.error.username && error.response.data.error.password && error.response.data.error.image) {
                setFirstnameErr(error.response.data.error.firstname);
                setLastnameErr(error.response.data.error.lastname);
                setEmailErr(error.response.data.error.email);
                setUsernameErr(error.response.data.error.username);
                setPassErr(error.response.data.error.password);
                setImageErr(error.response.data.error.image);
                setProgess(0);
            } else if (!error.response.data.error.firstname) {
                setFirstnameErr("");
                setProgess(0);
            } else if (error.response.data.error.firstname || error.response.data.error.lastname || error.response.data.error.email || error.response.data.error.username || error.response.data.error.password || error.response.data.error.image) {
                setInfoErr('Your information are not Valid!');
                setProgess(0);
            } else if (!error.response.data.error.lastname) {
                setLastnameErr("");
                setProgess(0);
            } else if (!error.response.data.error.email) {
                setEmailErr("");
                setProgess(0);
            } else if (!error.response.data.error.username) {
                setUsernameErr("");
                setProgess(0);
            } else if (!error.response.data.error.password) {
                setPassErr("");
            } else if (!error.response.data.error.image) {
                setImageErr('');
                setProgess(0);
            } else if (error.response.data.error.firstname) {
                setFirstnameErr(error.response.data.error.firstname);
                setProgess(0);
            } else if (error.response.data.error.lastname) {
                setLastnameErr(error.response.data.error.lastname);
                setProgess(0);
            } else if (error.response.data.error.email) {
                setEmailErr(error.response.data.error.email);
                setProgess(0);
            } else if (error.response.data.error.username) {
                setUsernameErr(error.response.data.error.username);
                setProgess(0);
            } else if (error.response.data.error.password) {
                setPassErr(error.response.data.error.password);
                setProgess(0);
            } else if (error.response.data.error.image) {
                setImageErr(error.response.data.error.image);
                setProgess(0);
            }
        }
    }
    if (loading) {
        return <p>Loading data...</p>;
    }
    const deleteItem = async (id) => {
        try {
            await Axios.delete(`http://localhost:8000/api/users/${id} `, {
                headers: {
                    'Accept': 'application/json',
                    'content-type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            }
            ).then((data) => {
                if (data.status === 200) {
                    console.log(data)
                    // alert("Deleted!");
                    const newData = users.filter((item) => item.id !== id);
                    setUsers(newData);
                }
            })
        } catch (err) { console.log(err) }
    }

    const updateInfo = async (id) => {
        if (!newfirstName && !newLastName && !newEmail && !newImage) {
            setnewFirstnameErr('Firstname is Required!');
            setnewLastnameErr('Lastname is Required!');
            setnewEmailErr('Email is Invalid!');
            setnewImageErr('Image is required!')
        } else if (newfirstName && !newLastName && !newEmail && !newImage) {
            setnewFirstnameErr('');
            setnewLastnameErr('Lastname is Required!');
            setnewEmailErr('Email is Invalid!');
            setnewImageErr('Image is required!')
        } else if (!newfirstName && newLastName && !newEmail && !newImage) {
            setnewFirstnameErr('Firstname is Required!');
            setnewLastnameErr('');
            setnewEmailErr('Email is Invalid!');
            setnewImageErr('Image is required!')
        } else if (!newfirstName && !newLastName && newEmail && !newImage) {
            setnewFirstnameErr('Firstname is Required!');
            setnewLastnameErr('Lastname is Required!');
            setnewEmailErr('');
            setnewImageErr('Image is required!')
        } else if (!newfirstName && newLastName && !newEmail && newImage) {
            setnewFirstnameErr('Firstname is Required!');
            setnewLastnameErr('Lastname is Required!');
            setnewEmailErr('Email is Invalid!');
            setnewImageErr('')
        } else if (!newEmail.includes('@') && !newEmail.includes('.com')) {
            setnewEmailErr('Please enter a valid email address');
        } else {
            const data = new FormData();
            data.append('firstname', newfirstName)
            data.append('lastname', newLastName)
            data.append('email', newEmail)
            data.append('image', newImage)
            try {
                await Axios.post(`http://localhost:8000/api/users/${id}?_method=PUT `, data, {
                    headers: {
                        'content-type': 'multipart/form-data',
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
        }

        if (!localStorage.getItem('token')) {
            return <Redirect to="/" />;
        }


    };
    return (
        <div className="adminss">
            <Sidenav />
            <div className="Header-nav">
                <form className="search">
                    <div className="search__wrapper">
                        <input value={search} placeholder="Find Admins..." type="text" name="" className="search__field" onChange={(e) => { setSearch(e.target.value) }} />
                        <button type="submit" className="fa fa-search search__icon"></button>
                    </div>
                </form>
                {/* {(loggedOut) ? (<Redirect exact to="/" />) : ""} */}
            </div>

            <nav aria-label="breadcrumb">
                <ol style={{ backgroundColor: "#a6a3bb" }} className="breadcrumb">
                    <li style={{ color: "#621840" }} className="breadcrumb-item active" aria-current="page">Admins</li>
                    <li style={{ opacity: "0.4" }} className="breadcrumb-item">Employees</li>
                    <li style={{ opacity: "0.4" }} className="breadcrumb-item">Teams</li>
                    <li style={{ opacity: "0.4" }} className="breadcrumb-item">Projects</li>
                    <li style={{ opacity: "0.4" }} className="breadcrumb-item">Reports</li>

                </ol>
            </nav>

            <div className="container">
                <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                    <button style={{ marginLeft: "10%", marginTop: "3%" }} type="button" id="change1" className="btn btn-info btn-md" data-toggle="modal" data-target="#myModal">Add Admin</button>
                    <div id="toggle-switch" style={{ display: "flex", fontSize: "15px", width: "20%", justifyContent: "space-between", marginTop: "4%", marginRight: "10%" }}>
                        <p>sort by list</p>
                        <label class="switch">
                            <input id="toggle" type="checkbox" onClick={toggleDisplay} />
                            <span className="slider round"></span>
                        </label><p>sort by grid</p>
                    </div>
                </div>
                <h1 id="admin-num" style={{ color: "#621840", marginLeft: "10%" }}>Number of <span style={{ color: "red" }}>admins</span> recruited &nbsp;<span style={{ fontSize: "25px" }} className="badge badge-secondary">{numOfAdmins}</span></h1>
                {successUpdate ? <div style={{ width: "80%", margin: "0 auto" }} className="alert alert-success">{successUpdate}</div> : ""}
                <div className="admins" style={(sortBy === true) ? { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", width: "80%", textAlign: "center" } : { display: "flex", flexDirection: "column" }} >
                    {(filteredData.length === 0) ? <div style={{ textAlign: "center", color: "red", fontSize: "20px", fontWeight: "bold" }}>No result found!</div> : (currentPosts.map((arr) => {
                        return <div className="parent" style={(sortBy === true) ? { display: "grid", width: "100%", height: "55vh", gridColumnGap: "5%" } : { display: "flex", flexDirection: "row", height: "0", padding: "1% 2% 5% 10%", justifyContent: "space-evenly" }} key={arr.id}>
                            <img style={(sortBy === true) ? { marginLeft: "23%", width: "116px", height: "116px" } : { marginLeft: "0%", marginTop: "-5px", marginLeft: "-6%", width: "44px", height: "44px" }} className="grid-image" src={`http://localhost:8000/storage/${arr.image}`} alt="error" />

                            <span id="admin" style={(sortBy === true) ? {fontSize:"17px" , color: "black", marginLeft: "35%" ,transform: 'translateX(-50%)', marginTop: "-9%", width: "15%" } : { color: "black", marginTop: "1%", width: "15%" }} >{arr.firstname}</span><span id="admin" style={(sortBy === true) ? {fontSize:"17px" , color: "black", marginLeft: "30%" ,transform: 'translateX(-50%)', marginTop: "-9%", width: "15%" } : { color: "black", marginTop: "1%", width: "15%" }}>{arr.lastname}</span><span id="admin" style={(sortBy === true) ? {fontSize:"17px" , color: "black", marginLeft: "25%",transform: 'translateX(-50%)', marginTop: "-9%", width: "15%" } : { color: "black", marginTop: "1%", width: "15%" }}>{arr.email}</span>
                            <button className="Button" id="delete-button" onClick={() => { deleteItem(arr.id) }}>Delete</button>
                            <div className="dropdown">
                                <button id="change2" style={{ width: "90%", height: "36px" ,fontSize:"14px"}} className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Update<span className="caret"></span></button>
                                <ul className="dropdown-menu">
                                    {newfirstnameErr ? <div className="alert alert-danger">{newfirstnameErr}</div> : ""}
                                    <label>Firstname</label>
                                    <input type="text" placeholder="enter firstname" onChange={(e) => { setNewfirstName(e.target.value); }} />
                                    {newlastnameErr ? <div className="alert alert-danger">{newlastnameErr}</div> : ""}
                                    <label>Lastname</label>
                                    <input type="text" placeholder="enter lastname" onChange={(e) => { setNewLastName(e.target.value); }} />
                                    {newemailErr ? <div className="alert alert-danger">{newemailErr}</div> : ""}
                                    <label>Email</label>
                                    <input type="text" placeholder="enter email" onChange={(e) => { setNewEmail(e.target.value); }} />
                                    {newimageErr ? <div className="alert alert-danger">{newimageErr}</div> : ""}<br></br>
                                    <label>Image
                                    <input className="form-control" type="file" name="image" id="image" placeholder="Enter your Address" onChange={(e) => { setNewImage(e.target.files[0]); console.log(e.target.files[0]) }} /></label>
                                    <button style={{ width: "70%", height: "40px" }} id="change1" className="Button" onClick={() => { updateInfo(arr.id) }}>Edit</button>
                                </ul>
                            </div>

                        </div>
                    }))}
                </div>
                <div className="container mt-5">
                    <Pagination
                        paginate={paginate}
                        postsPerPage={postsPerPage}
                        totalPosts={filteredData.length}
                    />
                </div>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h4 className="modal-title">Add an Admin to the list</h4>
                            </div>
                            <form encType="multipart/form-data">
                                <div className="modal-body">
                                    {infoErr ? <div className="alert alert-danger">{infoErr}</div> : ""}
                                    {success ? <div style={{ width: "80%", margin: "0 auto" }} className="alert alert-success">{success}</div> : ""}
                                    <label htmlFor="name">First name:</label>
                                    {firstnameErr ? <div className="alert alert-danger">{firstnameErr}</div> : ""}
                                    <input value={firstName} className="form-control" id="name" type="text" placeholder="Enter firstname" onChange={(e) => { setFirstName(e.target.value); }} />
                                    <label htmlFor="lastname">Last name:</label>
                                    {lastnameErr ? <div className="alert alert-danger">{lastnameErr}</div> : ""}
                                    <input value={lastName} className="form-control" id="lastname" type="Email" placeholder="Enter lastname" onChange={(e) => { setLastName(e.target.value); }} />
                                    <label htmlFor="text">Email</label>
                                    {emailErr ? <div className="alert alert-danger">{emailErr}</div> : ""}
                                    <input value={email} className="form-control" id="email" type="email" placeholder="Enter email" onChange={(e) => { setEmail(e.target.value); }} />
                                    <label htmlFor="image">Image</label>
                                    {imageErr ? <div className="alert alert-danger">{imageErr}</div> : ""}
                                    <input className="form-control" type="file" name="image" id="image" onChange={(e) => { setImage(e.target.files[0]); console.log(e.target.files[0]) }} />
                                    <label htmlFor="username">Username:</label>
                                    {usernameErr ? <div className="alert alert-danger">{usernameErr}</div> : ""}
                                    <input value={userName} className="form-control" id="username" type="text" placeholder="Enter username" onChange={(e) => { setUserName(e.target.value); }} />
                                    <label htmlFor="password">Password:</label>
                                    {passErr ? <div className="alert alert-danger">{passErr}</div> : ""}
                                    <input value={password} className="form-control" id="password" type="password" placeholder="Enter password" onChange={(e) => { setPassword(e.target.value); }} />
                                    <div className="progessBar" style={{ width: progress }}>
                                        {progress}
                                    </div>
                                    <button id="add-button" style={{ marginTop: "3%", backgroundColor: "#400f35", border: "transparent none" }} className="btn btn-primary btn-lg btn-block" onClick={handleAdd}>Submit</button>
                                </div>
                            </form>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Admins;
