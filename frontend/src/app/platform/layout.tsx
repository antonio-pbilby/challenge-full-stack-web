'use client'
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function PlatformLayout({ children }: { children: ReactNode }) {
  const { isLogged, isPending } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLogged) {
      router.push('/login');
    }
  }, [isLogged, router])

  if (isPending) {
    return <div className="h-screen w-screen flex justify-center items-center"><Loader2 className="mr-2 h-8 w-8 animate-spin block" /></div>;
  }

  if (!isLogged) {
    return <></>
  }

  return (
    <Layout>{children}</Layout>
  )
}