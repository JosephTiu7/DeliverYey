import axios from 'axios'

const baseUrl = import.meta.env.VITE_BASE_URL

class StudentService {
    static async login(idNumber, password, setLoading, setError, navigate) {
        setLoading(true)
        setError(null) // Reset error message before new login attempt
        console.log(idNumber)
        console.log(password)
        try {
            const response = await axios.post(`${baseUrl}auth/signin`, {
                idNumber,
                password,
            })
            console.log(response.data)

            setLoading(false)

            // Check if response is JSON and status code is 200
            if (
                response.headers['content-type']?.includes(
                    'application/json'
                ) &&
                response.status === 200
            ) {
                return response.data
            } else {
                throw new Error(
                    `Unexpected response from server. Status code: ${response.status}`
                )
            }
        } catch (error) {
            setLoading(false)
            console.error('Error during login:', error)

            // Set user-friendly error message
            setError(
                error.response?.data?.message ||
                    error.message ||
                    'Login failed. Please check your ID number and password.'
            )
        }
    }

    static async register(formData, setLoading, navigate) {
        setLoading(true)
        var result = ''
        try {
            const response = await axios.post(`${baseUrl}auth/signup`, formData)
            setLoading(false)

            if (
                response.headers
                    .get('content-type')
                    ?.includes('application/json')
            ) {
                return result
            } else {
                result = {
                    message: `Server returned non-JSON response with status code ${response.status}`,
                }
            }

            if (response.status === 200) {
                console.log('Registration Successful!')
            } else {
                throw new Error(
                    `Registration failed with status code ${response.status}`
                )
            }
        } catch (error) {
            setLoading(false)
            console.error('Error during registration:', error)
        }
    }

    static async getAllProduct(token) {
        try {
            const res = await axios.get(`${StudentService.baseUrl}product`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            return res.data
        } catch (err) {
            throw err
        }
    }

    /**AUTHENTICATION CHECKER */
    static logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('role')
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token')
        return !!token
    }

    static isStaff() {
        const role = localStorage.getItem('role')
        return role === 'STAFF'
    }

    static isStudent() {
        const role = localStorage.getItem('role')
        return role === 'STUDENT'
    }

    static studentOrStaffOnly() {
        return this.isAuthenticated() && (this.isStaff() || this.isStudent())
    }

    static studentOnly() {
        return this.isAuthenticated() && this.isStaff()
    }

    static staffOnly() {
        return this.isAuthenticated() && this.isStaff()
    }
}

export default StudentService
