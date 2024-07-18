// import { useRouter } from "next/router"
import { usePathname, useRouter } from "next/navigation";
export const useRoles = (roles) => {
    const pathname = usePathname();
    const router = useRouter();

    const getRoleFromPath = (path) => {
        if (path.startsWith('/admin')) return 'ADMIN';
        if (path.startsWith('/user')) return 'USER';
        if (path.startsWith('/tl')) return 'TL';
        if (path.startsWith('/hr')) return 'HR';
        return 'GUEST';
    };

    const currentRole = getRoleFromPath(pathname);
    const roleExists = roles.some(role => role.name === currentRole);

    if (!roleExists) {
        router.push('/not-found.jsx');
    }

    return {
        currentRole,
        roles
    };
}