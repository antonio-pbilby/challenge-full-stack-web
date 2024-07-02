import { ReactNode } from "react"
import { Header } from "./Header"
import { NavigationMenu } from "./NavigationMenu"

export const Layout = ({ children }: { children: ReactNode }) => {
  return (<div className="h-screen flex flex-col">
    <Header />
    <div className="flex flex-grow">
      <aside className="bg-slate-300 w-52">
        <NavigationMenu />
      </aside>
      <main className="flex-1 py-4 max-w-[900px] mx-auto">
        {children}
      </main>
    </div>
  </div>)
}