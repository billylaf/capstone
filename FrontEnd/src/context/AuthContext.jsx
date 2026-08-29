import React, { createContext, useState, useContext, useEffect } from "react"
import api from "../api/axios"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      setIsAuthenticated(true)
      setUser({ role: "ROLE_ADMIN" })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      localStorage.setItem("accessToken", response.data.accessToken)
      setIsAuthenticated(true)
      setUser({ role: "ROLE_ADMIN" })
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Credenziali non valide",
      }
    }
  }

  const logout = () => {
    localStorage.removeItem("accessToken")
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
