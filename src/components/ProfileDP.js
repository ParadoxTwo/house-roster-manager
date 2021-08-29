import React from 'react'
import { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProfileDP = () => {
    const {user} = useAuth0()
    const [picture, setPicture] = useState(user?user.picture:'logo192.png')
    useEffect(()=>{
        async function call(){
            await axios.get('http://localhost:5000/user/get',{
                params:{
                    emailId: user.email
                }
            }).then(async response=>{
                if(response.data.length>0){ //if user data already exists in database
                    setPicture(response.data[0].img_url)
                }
                else{ //if it doesn't exist then gotta create a new one!
                    //post here
                    await axios.post('http://localhost:5000/user/create',{
                        emailId: user.email, 
                        emailIdVisible: true, 
                        fullName: user.name, 
                        dob: "", 
                        dobVisible: false, 
                        fullAddress: "", 
                        fullAddressVisible: false, 
                        bio: "",
                        imgUrl: user.picture
                    })
                }
            })
        }
        if(user) call()
    },[user])
    return (
        <Link to={'/profile'}>
            <img alt="profile" style={{borderRadius: '50%', margin:"10px"}} height={50} src={picture}/>
        </Link>
    )
}

export default ProfileDP