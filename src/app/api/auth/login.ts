import axiosInstance from "@/app/utils/axiosInstance";
import Cookies from "js-cookie";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await axiosInstance.post("auth/login", {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.acces_token;
      Cookies.set("access_token", token, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: false,
        expires: 1,
      });
      console.log(token);

      return token;
    }

    throw new Error("Respuesta inesperada del servidor");
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error al iniciar sesión");
    }
    throw new Error("Error de red o problema desconocido");
  }
};
