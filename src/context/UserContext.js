import React, { useState } from 'react'
const UserContext = React.createContext()

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({})

    return (
        <UserProvider.Provider value={{ user, setUser }}>
            {children}
        </UserProvider.Provider>
    )
}

export default UserContext