import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const logoutCaptain = async () => {
            const token = localStorage.getItem('token')

            try {
                await axios.get(`${import.meta.env.VITE_API_URL}/captains/logout`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            } catch (error) {
                console.error("Logout API failed:", error)
            } finally {
                localStorage.removeItem('token') // ✅ always remove token
                navigate('/captain-login')
            }
        }

        logoutCaptain()
    }, [navigate])

    return <div>Logging out...</div>
}

export default CaptainLogout
