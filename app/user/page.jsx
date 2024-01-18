"use client"
import "../aws-auth"
import '@aws-amplify/ui-react/styles.css';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { fetchUserAttributes } from "aws-amplify/auth";
import { useEffect, useState } from "react";

const User = ({ signOut }) => {
    
    const [userState, setUserState] = useState({})

    const fetchData = async () => {
        try {
            const userdata = await fetchUserAttributes()
            setUserState(userdata)
            console.log(userdata)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <>
            <p className="m-1">Hello : {userState.name} </p>
            <button className="bg-red-500 m-1 p-1 rounded text-white font-semibold" onClick={signOut}>Logout</button>
        </>
    )
}

export default withAuthenticator(User)