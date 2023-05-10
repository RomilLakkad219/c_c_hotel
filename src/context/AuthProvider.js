import React, { createContext, useState } from "react";

//API
import { userProfile } from "../api";

export const AuthContext = createContext();

export const AuthProvider = (props) => {

    const [user, setUser] = useState(null)
    const [profile, setProfile] = useState(null)

    async function fetchProfile() {
        const params = {
            user_id: user?.[0]?.user_id
        }

        const result = await userProfile(params)

        if (result.status) {
            if (result?.data?.status == "1") {
                const profile = result?.data?.result?.user?.[0]
                setProfile(profile)
            }
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            setProfile,
            profile,
            fetchProfile
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}