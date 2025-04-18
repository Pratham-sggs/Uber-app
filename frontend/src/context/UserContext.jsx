import React from 'react'


export const UserDataContext = React.createContext()

export const UserContext = ({children}) => {

    const [user, setUser] = React.useState({
        email: '',
        fullname: '',
        lastName: '',
    })

  return (
    <div>
        <UserDataContext.Provider value={user}> 
        {children}
        </UserDataContext.Provider>
    </div>
  )
}
export default UserContext