import React from 'react'
import "./Profile.css";
import image2 from "../../images/image2.jpg"
import ProfileForm from '../ProfileForm/ProfileForm';
import PostItem from '../PostItem/PostItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';


const Profile = () => {
    return (
        <div>
        <div className="postbtnicon flex">
        <Link to = "/addassumption">
      <FontAwesomeIcon icon = {faPlus} style = {{color:"#fff"}} size = "3x"/>
      </Link>
        
          </div>
        <div className ="user-profile">
            <div className="profile">
                <div className="contact-area">
                    <div className="profile-image-heading flex">
                        <h1 className ="profileheading">Profile Image</h1>
                        
                        <h2 className = "postbutton"><Link to = "/addassumption" style = {{textDecoration:"none",color:"#fff"}}>ADD POST</Link></h2>
                        
                    </div>
                    <div className="profile-pic flex">
                        <img src={image2} alt=""/>
                    </div>
                    <div className="form">
                        <ProfileForm/>
                    </div>
                    <div className="assumption-heading">
                        <h2 className = "myassumption">My Assumptiopns</h2>
                        <Link to = "/usertimeline" className = "allassumption">
                        <h2 >See All Assumptions</h2></Link>
                    </div>
                </div>
                {/* <hr/> */}
                <div className="assumptions flex">
                   <PostItem/> 
                   <PostItem/>
                   <PostItem/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Profile