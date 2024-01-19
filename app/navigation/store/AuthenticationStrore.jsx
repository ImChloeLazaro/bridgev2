import { atom } from "jotai";
import "../../aws-auth"
import { fetchUserAttributes } from "aws-amplify/auth";

const initialState = {
    isAuthenticated : false,
    user : null,
    message : 'initial state'
}

const authstore = async () => {
    try {
        const user = await fetchUserAttributes()
        return {
            isAuthenticated : true,
            user : user,
            message : 'authenticated'
        }        
    } catch (error) {
        return {
            isAuthenticated : true,
            user : null,
            message : 'authenticated'
        }     
    }
}

export const AuthenticationStore = atom(async () => {
    return await authstore()
}, initialState)