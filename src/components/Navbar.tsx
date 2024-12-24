"use client";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth"; 

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); 

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login")

  };

  return (
    <nav className="bg-white w-full flex justify-between p-6 items-center">
      <ul className="flex space-x-4">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/users">Usuarios</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link href="/auth/signup">Registrarse</Link>
          </li>
        )}
      </ul>
      {isAuthenticated && <Button onClick={handleLogout}>Cerrar sesión</Button>}
      {!isAuthenticated && (
        <Link href={"/auth/login"} className={buttonVariants()}>
          Iniciar sesión
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
