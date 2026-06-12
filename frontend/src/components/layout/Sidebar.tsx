import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    Package,
    Tag,
    Warehouse,
    BarChart3,
    Users,
    LogOut,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { usePermission } from '../../hooks/usePermission'
import { ROUTES } from '../../constants/routes'
import { cn } from '../../utils/cn'

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, to: ROUTES.DASHBOARD },
    { label: 'Produtos', icon: Package, to: ROUTES.PRODUCTS },
    { label: 'Categorias', icon: Tag, to: ROUTES.CATEGORIES },
    { label: 'Estoque', icon: Warehouse, to: ROUTES.INVENTORY },
    { label: 'Relatórios', icon: BarChart3, to: ROUTES.REPORTS },
    { label: 'Usuários', icon: Users, to: ROUTES.USERS, adminOnly: true },
]

export function Sidebar() {
    const { user, signOut } = useAuth()
    const { isAdmin } = usePermission()

    const filteredItems = navItems.filter((item) => !item.adminOnly || isAdmin())

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-sidebar flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <h1 className="text-white font-bold text-lg">Catálogo Digital</h1>
                <p className="text-white/50 text-xs mt-0.5">Gestão para Distribuidoras</p>
            </div>

            {/* Navegação */}
            <nav className="flex-1 p-4 space-y-1">
                {filteredItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                            cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                                isActive
                                    ? 'bg-white/15 text-white font-medium'
                                    : 'text-white/60 hover:bg-white/10 hover:text-white',
                            )
                        }
                    >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Usuário */}
            <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                        <span className="text-white text-xs font-bold">
                            {user?.nome?.charAt(0)?.toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">{user?.nome}</p>
                        <p className="text-white/50 text-xs truncate">{user?.role}</p>
                    </div>
                </div>

                <button
                    onClick={signOut}
                    className="flex items-center gap-2 text-white/60 hover:text-white text-sm w-full px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <LogOut className="h-4 w-4" />
                    Sair
                </button>
            </div>
        </aside>
    )
}