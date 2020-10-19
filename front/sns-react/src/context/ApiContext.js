import React, {createContext, useState, useEffect} from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
export const ApiContext = createContext()

const ApiContextProvider = (props) => {

    const token = props.cookies.get('current-token')
    const [profile, setProfile] = useState([])
    const [profiles, setProfiles] = useState([])
    const [editedProfile, setEditedProfile] = useState({id:'', nickName:''})
    const [askList, setAskList] = useState([])
    const [askListFull, setAskListFull] = useState([])
    const [inbox, setInbox] = useState([])
    const [cover , setCover] = useState([])

    useEffect(() => {
        const getMyProfile = async() => {
            try {
                const resmy = await axios.get('http://localhost:8000/api/user/myprofile/',{
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                const res = await axios.get('http://localhost:8000/api/user/approval/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                resmy.data[0] && setProfile(resmy.data[0])
                resmy.data[0] && setEditedProfile({id:resmy.data[0].id, nickName: resmy.data[0].nickName})
                resmy.data[0] && setAskList(res.data.filter(ask=>{return resmy.data[0].userPro === ask.askTo}))
                setAskListFull(res.data)
            }
            catch {
                console.log("error")
            }
        }

        const getProfile = async() => {
            try {
                const res = await axios.get('http://localhost:8000/api/user/profille/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                setProfiles(res.data)}
            catch {
                console.log("error")
            }
        }

        const getInbox = async() => {
            try {
                const res = await axios.get('http://localhost:8000/api/user/profille/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                })
                setInbox(res.data)}
            catch {
                console.log('error')
            }
        }
        getMyProfile()
        getProfile()
        getInbox()
    },[token, profile.id])

    const createProfile = async() => {
        const createData = new FormData()
        createData.append("nickName", editedProfile.nickName)
        cover.name && createData.append('img', cover, cover.name)
        try {
            const res = await axios.post('http://localhost:8000/api/user/profile/', createData, {
                headers: {
                    'Contet-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setProfile(res.data)
            setProfile({id:res.data.id, nickName: res.data.nickName})
        }
        catch {
            console.log("error")
        }
    }

    const deleteProfile = async() => {
        try {
            await axios.delete(`http://localhost:8000/api/user/profile/${profile.id}/`, {
                headers: {
                    'Contet-Type': 'application/json',
                    'Authorization': `Token ${token}`
                }
            })
            setProfiles(profile.filter(dev => dev.id !== profile.id))
            setProfile([])
            setProfile({id:'', nickName: ''})
            setCover([])
            setAskList([])
        }
        catch {
            console.log("error")
        }
    }

    return (
        <div>
            
        </div>
    )
}

export default withCookies(ApiContextProvider)
