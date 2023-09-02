import React, { useContext, useEffect, useState } from 'react';
import avatarIcon from "../../img/avatar.jpg"
import UserContext from '../../context/userContext/UserContext';
import MailIcon from '@mui/icons-material/Mail';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';
import { getNumberOfPostsById, getPostsById } from '../../helpers/apiHHelper';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const  navigate =  useNavigate()

    const { user } = useContext(UserContext)

    const [numberOfPosts, setNumberOfPosts] = useState(0)

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const windowResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', windowResize);

        return () => {
            window.removeEventListener('resize', windowResize);
        };
    }, []);

    useEffect(() => {
        user && getNumberOfPostsById(user.id)
            .then(res =>{
                console.log(res);
                setNumberOfPosts(res)
            } )
            .catch(error => console.log(error))
    }, [user])

    return (
        user &&
        <div style={{
            minHeight: "100%",
            width: windowWidth >= 1200 ? 100 / 6 + "%" : "25%",
            position: "fixed",
            left: "0px",
            top: 62,
            backgroundColor: "#F5F5F5",
            height: "100vh !important",
            border: "1px solid #E8E7E7"
        }}
        >
            <div className='d-flex flex-column p-4'>
                <img className='w-100 h-auto' src={avatarIcon}></img>
                <h4 className='nameStyle mt-2'>{user.name}</h4>
                <p className='mailStyle mb-0'>{user.email}</p>
                <hr />
                <p onClick={() => navigate(`/profile/${user.id}`)} className='m-0 p-2 profileOptions d-flex resumeStyle'><ArticleIcon></ArticleIcon> Mis publicaciones ({numberOfPosts})</p>
                <p className='m-0 p-2 profileOptions d-flex resumeStyle'><InsertPhotoIcon></InsertPhotoIcon> Mis fotos (0)</p>
            </div>
        </div>
    );
};

export default Sidebar;