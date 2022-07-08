import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './UserList.css'
import { Link } from 'react-router-dom';
import userImg from '../../assets/avatar.png'
import { Button } from 'react-bootstrap';

const UserList = () => {
    const [userList, setuserList] = useState([]);

    useEffect(() => {
        axios.get('/users')
            .then(res => {
                setuserList(res.data.users)
            })
    }, []);

    return (
        <div className="ontainer-fluid px-4">

            <div className='user-wrapper'>
                {userList.map(info => {
                    return (
                        <div className="flip-card" key={info._id}>
                            <div className="flip-card-inner">
                                <div className="flip-card-front">
                                    <img src={info.profile_image.contentType ? `${process.env.REACT_APP_API_URL}/user/photo/${info._id}` : userImg} alt="Avatar" style={{ width: "100%", height: "100%", objectFit: 'cover' }} />
                                </div>
                                <div className="flip-card-back">
                                    <h3>{info.name.first_name} {info.name.last_name}</h3>
                                    <p>{info.designation}</p>
                                    <p>{info.email}</p>
                                    <Link to={`/userprofile/${info._id}`} className='mb-2'>view profile</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default UserList;