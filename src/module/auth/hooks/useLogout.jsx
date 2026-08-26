// import type { UserActions } from "@/store";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../../stores'
import { useAuth } from '../../../hooks/useAuth.js'

function useLogout() {
    const navigate = useNavigate();
    const { setUser, setAuthenticated } = useUserStore(
        (state) => state
    )
    const { setUser: setAuthUser, setTokens } = useAuth();
    const clearDataUser = () => {
        setAuthenticated(false)
        setUser(null)
        setAuthUser(null)
        setTokens(null)
    }
    const logout = async () => {
        try {
            clearDataUser()
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error)
        }
    }
    return {
        logout,
    }
}

export default useLogout