import React from 'react';
import placeholder from '../assets/imgsvg.svg'
import DropdownButton from 'react-bootstrap/esm/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown'
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';


const Postcard = (props) => {

    const {deletePost} = useAuth()

    const btnIcon = (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-three-dots-vertical" viewBox="0 0 16 16">
        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>);

    return (
        <div>
            <div className="widget widget-blog">
                <div className="widget-blog-cover">
                    {props.menu ? (
                        <DropdownButton
                            variant="outline-secondary"
                            title={btnIcon}
                            id="input-group-dropdown-1"
                            className='btn btn-light post-menu-btn'
                        >
                            <Link to={`/editpost/${props.postId}`} className='dropdown-item'>Edit</Link>
                            <Dropdown.Item onClick={() => deletePost(props.postId)}>Delete</Dropdown.Item>
                        </DropdownButton>) : null}
                    <img src={props.photoUrl ? props.photoUrl : placeholder}
                        alt={props.title}
                        style={{ width: '100%' }} />
                </div>
                <div className="widget-blog-author">
                    <div className="widget-blog-author-image">
                        <img src={`${process.env.REACT_APP_API_URL}/user/photo/${props.userId}`}
                            alt={props.username}
                            style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
                    </div>
                    <div className="widget-blog-author-info">
                        <h5 className="m-t-0 mb-0">{props.firstName} {props.lastName}</h5>
                        <p className="text-muted m-0 f-s-11">{props.designation}</p>
                    </div>
                </div>
                <div className="widget-blog-content">
                    <h5>{props.title}</h5>
                    <p>{props.body}</p>
                </div>
            </div>
        </div>
    );
}

export default Postcard;