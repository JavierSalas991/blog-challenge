import React from 'react';
import avatarIcon from "../../img/avatar2.png"

const ProfileData = ({ actualUser }) => {
    return (
        <div className='d-flex flex-column m-4'>
            <div className='d-flex justify-content-between'>
                <div className='col-2'>
                    <img className='w-100 h-auto' src={avatarIcon}></img>
                </div>
                <div className='containerNumbers'>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='numberProfile'>5</p>
                        <p>Publicaciones</p>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='numberProfile'>22</p>
                        <p>Fotos</p>
                    </div>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='numberProfile'>35</p>
                        <p>Amigos</p>
                    </div>
                </div>

            </div>
            <h4 className='usernameStyle mt-2'>{actualUser.name}</h4>
        </div >
    );
};

export default ProfileData;