import React from 'react'

export const UserDataContext = React.createContext()

export const UserContext = ({ children }) => {
  const [user, setUser] = React.useState({
    email: '',
    fullname: '',
    lastName: '',
  })

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
