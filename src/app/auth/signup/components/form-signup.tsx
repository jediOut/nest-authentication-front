"use client";

import { useState } from "react";
import { signUp } from "../../../api/auth/signUp";
import { SignUpData } from "../../../../types/auth";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { login } from "@/app/api/auth/login";

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
  });

  const { login: authLogin } = useAuth();

  const router = useRouter();

  const [message, setMessage] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await signUp(formData.email, formData.password);

      authLogin(token);
      setMessage("registro exitoso");
      router.push("/protected/dashboard");
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error: any) {
      setMessage(error.message || "Error al  registrarse");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-80 h-auto rounded-md p-5"
    >
      <h2 className="font-bold text-center text-xl mb-5">Registro</h2>
      <div className="grid items-center gap-4 w-full">
        <div className="flex flex-col ">
          <Label>Email: </Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col ">
          <Label>Contraseña: </Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="bg-teal-800">
          Registrarse
        </Button>
        {message && <p>{message}</p>}
      </div>
    </form>
  );
};

export default SignUpForm;
