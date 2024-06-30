'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const routes = [
  {
    path: '/platform/patients',
    label: 'Patients'
  },
  {
    path: '/platform/agencies',
    label: 'Agencies'
  }
]


export default function PlatformLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();

  return (<div className="h-screen flex flex-col">
    <header className="w-screen bg-slate-300 h-16 p-4 flex justify-between">
      <span className="text-3xl font-bold text-lime-700">ISA</span>
      <Link href={'/login'} className="underline">Logout</Link>
    </header>
    <div className="flex flex-grow">
      <aside className="bg-slate-300 w-52">
        <nav>
          <ul>
            {routes.map(({ label, path }) => {
              return (
                <li className="flex justify-between relative" key={path}>
                  <Link href={path} className={`w-full p-2 flex justify-between hover:bg-slate-200 ${pathName === path ? 'bg-slate-200' : ''}`}>
                    <span>{label}</span>
                    <span>{'>'}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 py-4 px-72">
        {children}
      </main>
    </div>
  </div>)
}