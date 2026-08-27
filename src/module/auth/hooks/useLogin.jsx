// import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../../../stores";
import { useAuth } from "../../../hooks/useAuth.js";

function useLogIn() {
  const navigate = useNavigate();
  const { setUser, setAuthenticated } = useUserStore((state) => state);
  const { setUser: setAuthUser, setTokens } = useAuth();

  const logIn = async (values) => {
    try {
      const role = values?.email?.includes('admin') ? 'admin' : values?.email?.includes('trainer') ? 'trainer' : 'teacher';
      const mockUser = {
        id: '1',
        name: values?.email?.split('@')[0] || 'Usuario',
        email: values?.email || 'usuario@demo.com',
        role,
      };
      const mockTokens = { accessToken: 'mock-token', refreshToken: 'mock-refresh' };
      setAuthenticated(true);
      setUser(mockUser);
      setAuthUser(mockUser);
      setTokens(mockTokens);
      navigate(role === 'trainer' ? '/my-sessions' : '/dashboard', { replace: true });
      return { ok: true };
    } catch (error) {
      console.log(error);
      return { ok: false };
    }
  }
  return {
    logIn,
  }
}

export default useLogIn