import { atom } from "jotai";
import { fetchUserAttributes } from "aws-amplify/auth";
import "../../aws-auth"

const initialState = {
    isAuthenticated : false,
    user : null,
    message : 'initial state'
}

const authstore = async () => {
    try {
        const user  = await fetchUserAttributes()
        return {
            isAuthenticated : true,
            user : user,
            message : 'authenticated'
        }
    } catch (error) {
        return {
            isAuthenticated : false,
            user : null,
            message : 'not authenticated'
        }
    }
}
export const AuthenticationStore = atom(async () => {
    return await authstore()
}, initialState)