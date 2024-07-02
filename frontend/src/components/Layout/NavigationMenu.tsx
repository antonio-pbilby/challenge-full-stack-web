import Link from "next/link"
import { usePathname } from "next/navigation";

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

export const NavigationMenu = () => {
  const pathName = usePathname();

  return (
    <nav>
      <ul>
        {routes.map(({ label, path }) => {
          return (
            <li className="flex justify-between relative" key={path}>
              <Link href={path} className={`w-full p-2 flex justify-between hover:bg-slate-200 ${pathName.includes(path) ? 'bg-slate-200' : ''}`}>
                <span>{label}</span>
                <span>{'>'}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}