"use client";

import { LoginData } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/app/api/auth/login";

const FormLogin: React.FC = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await login(formData.email, formData.password);

      setMessage("Inicio de sesión exitoso");

      router.push("/protected/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error: any) {
      setMessage(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white w-80 h-70 p-6 rounded-md">
      <h2 className="font-bold text-4xl p-4 text-center mb-4">Login</h2>
      <div className="grid gap-4">
        <div>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Ingrese su email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Contraseña:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <Button type="submit" className="p-5 mt-6 bg-teal-700">
        Iniciar Sesión
      </Button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default FormLogin;
