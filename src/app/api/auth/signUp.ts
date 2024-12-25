import axiosInstance from "@/app/utils/axiosInstance";
import Cookies from "js-cookie";

export const signUp = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await axiosInstance.post("auth/signup", {
      email,
      password,
    });

    if (response.status === 201) {
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
      throw new Error(error.response.data.message || "Error al registrarse");
    }
    throw new Error("Error de red o problema desconocido");
  }
};
