import { useAuth } from "@/hooks/use-auth"
import { Button } from "../ui/button";

export const Header = () => {
  const { logout, isPending } = useAuth();
  return (
    <header className="w-screen bg-slate-300 h-16 p-4 flex justify-between">
      <span className="text-3xl font-bold text-lime-700">ISA</span>
      <Button onClick={() => logout()} variant={"outline"} disabled={isPending}>
        Logout
      </Button>
    </header>
  )
}