'use client'
import { LoginInputs } from "@/schemas/login.schema";
import { api } from "@/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useState } from "react"

export interface AuthContextInterface {
  isLogged: boolean;
  login: Function;
  logout: Function;
  isPending: boolean;
}

export const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();

  const { mutate: login, isPending: isLoginPending } = useMutation({
    mutationFn: async (data: LoginInputs) => {
      await api.post('/login', data);
    },
    onSuccess: () => {
      setIsLogged(true);
      router.push('/platform/patients');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return alert(`Failed to login. ${error.response?.data.message}`)
      }
      return alert('Failed to login');
    }
  });

  const { mutate: logout, isPending: isLogoutPending } = useMutation({
    mutationFn: async () => {
      await api.post('/logout');
    },
    onSuccess: () => {
      setIsLogged(false);
      router.push('/login');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        return alert(`Failed to logout. ${error.response?.data.message}`)
      }
      return alert('Failed to logout');
    }
  });

  const isPending = isLoginPending || isLogoutPending;

  const value = {
    isLogged, login, logout, isPending
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}