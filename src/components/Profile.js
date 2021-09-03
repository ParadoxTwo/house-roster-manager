import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { Button, Input } from '@material-ui/core'
import './profile.scss'
import { Visibility, VisibilityOff } from '@material-ui/icons'

const Profile = () => {
    const {user} = useAuth0()
    const [name, setName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [emailIdVisible, setEmailIdVisible] = useState(true)
    const [dob, setDob] = useState('')
    const [dobVisible, setDobVisible] = useState(false)
    const [fullAddress, setFullAddress] = useState('')
    const [fullAddressVisible, setFullAddressVisible] = useState(false)
    const [bio, setBio] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [change, setChange] = useState(false)
    const [dbUserData, setDbUserData] = useState(undefined)

    useEffect(()=>{
        async function call(){
            await axios.get('http://localhost:5000/user/get',{
                params:{
                    emailId: user.email
                }
            }).then(async response=>{
                if(response.data.length>0){ //if user data already exists in database
                    console.log(response.data[0])
                    let resDob = new Date(response.data[0].dob), myDob = new Date("01/01/1000")
                    console.log('res dob date: ',resDob)
                    console.log('my dob date: ',myDob)
                    if (resDob.toString() === myDob.toString()){
                        console.log("Equal!")
                        let temp = response.data[0]
                        temp.dob = ''
                        setDbUserData(temp)
                        setDob('')
                    }
                    else{
                        console.log("Not equal!")
                        let temp = response.data[0]
                        temp.dob = resDob.toLocaleDateString()
                        setDbUserData(temp)
                        setDob(resDob.toLocaleDateString())
                    }

                    setName(response.data[0].full_name)
                    setEmailId(response.data[0].email_id)
                    setEmailIdVisible(response.data[0].email_id_visible)
                    setDobVisible(response.data[0].dob_visible)
                    setFullAddress(response.data[0].full_address)
                    setFullAddressVisible(response.data[0].full_address_visible)
                    setBio(response.data[0].bio)
                    setImgUrl(response.data[0].img_url)
                }
                else{ //if it doesn't exist then gotta create a new one!
                    //post here
                    console.log("New!")
                    setName(user.name)
                    setEmailId(user.email)
                    setImgUrl(user.picture)
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
        setChange(false)
    },[user])

    const update = async ()=>{
        await axios.put('http://localhost:5000/user/update',
            {emailId, emailIdVisible, fullName: name, dob, dobVisible, fullAddress, fullAddressVisible, bio, imgUrl}
        ).then((res)=>{
            console.log(res)
            setChange(false)
        })
    }

    const cancel = ()=>{
        setName(dbUserData.full_name)
        setEmailId(dbUserData.email_id)
        setEmailIdVisible(dbUserData.email_id_visible)
        setDob(dbUserData.dob)
        setDobVisible(dbUserData.dob_visible)
        setFullAddress(dbUserData.full_address)
        setFullAddressVisible(dbUserData.full_address_visible)
        setBio(dbUserData.bio)
        setImgUrl(dbUserData.img_url)
    }

    const changeCheck = ()=>{
        if(dbUserData)
            return !(
                dbUserData.full_name===name&&
                dbUserData.email_id===emailId&&
                dbUserData.email_id_visible===emailIdVisible&&
                dbUserData.dob===dob&&
                dbUserData.dob_visible===dobVisible&&
                dbUserData.full_address===fullAddress&&
                dbUserData.full_address_visible===fullAddressVisible&&
                dbUserData.bio===bio&&
                dbUserData.img_url===imgUrl
            )
        else return false
    }
    useEffect(()=>{
        setChange(changeCheck())
    }, [emailId, emailIdVisible, name, dob, dobVisible, fullAddress, fullAddressVisible, bio, imgUrl])
    return (
        <div>
            <div className="content">
                <div className="dp-container">
                    <div className="overlay">
                        <img className="profile-picture"alt="profile" src={imgUrl}/>
                        <div className="after"><Button  variant = {'contained'}>Change DP</Button></div>
                    </div>
                    <span className="name">{dbUserData?dbUserData.full_name:""}</span>
                </div>
                <div className="table-container">
                    <span className="title">Profile Information</span>
                    <table >
                        <thead>
                            <tr><td></td><td></td><th>Visibility</th></tr>
                        </thead>
                        <tbody>
                            <tr><td className="label">Name: </td><td><Input fullWidth type="text" color='primary' value={name} onChange={e=>{setName(e.target.value)}}/></td><td></td></tr>
                            <tr><td className="label">Email: </td><td>{emailId}</td><td className="visibility"> {emailIdVisible?<Visibility onClick={()=>setEmailIdVisible(false)}/>:<VisibilityOff onClick={()=>setEmailIdVisible(true)}/>}</td></tr>
                            <tr><td className="label">Date of Birth: </td><td><Input fullWidth type="text" color='primary' value={dob} onChange={e=>{setDob(e.target.value)}}/></td><td className="visibility">{dobVisible?<Visibility onClick={()=>setDobVisible(false)}/>:<VisibilityOff onClick={()=>setDobVisible(true)}/>}</td></tr>
                            <tr><td className="label">Full Address:</td><td><Input fullWidth type="text" color='primary' value={fullAddress} onChange={e=>{setFullAddress(e.target.value)}}/></td><td className="visibility">{fullAddressVisible?<Visibility onClick={()=>setFullAddressVisible(false)}/>:<VisibilityOff onClick={()=>setFullAddressVisible(true)}/>}</td></tr>
                            <tr><td className="label">Bio</td><td><Input className="bio" rows='4' multiline fullWidth value={bio} onChange={e=>{setBio(e.target.value)}}/></td><td></td></tr>
                            <tr>
                                <td></td>
                                <td><Button style={{height: '40px'}}  variant = {'contained'} color = {'primary'} disabled = {!change} onClick = {update}>Update</Button></td>
                                <td><Button style={{height: '40px'}}  variant = {'contained'} color = {'primary'} onClick={cancel}>Cancel</Button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    )
}

export default Profile