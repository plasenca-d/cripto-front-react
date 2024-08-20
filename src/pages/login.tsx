import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Cookies from 'js-cookie'
import instance from "@/utils/instance";

export function Login() {
  const navigate = useNavigate();

  let [username, setUsername] = useState("")
  let [password, setPassword] = useState("")

  const login = () => {
    if (!username, !password) {
      withReactContent(Swal).fire({
        title: "Error!",
        text: "Debes poner todos los datos para iniciar sesion!",
        icon: "error"
      })
      return
    }

    instance.post("auth/login", { username, password }).then((result) => {
      let data = result.data.data
      console.log(data)
      Cookies.set("sesion", true)
      Cookies.set("token", data.token)
      Cookies.set("name", data.firstName + ' ' + data.lastName)
      Cookies.set("username", data.username)
      Cookies.set("id", data.id)
      Cookies.set("role", data.role)
      Cookies.set("avatar", data.avatar)
      withReactContent(Swal).fire({
        title: "Exito!",
        text: "Sesion Iniciada Correctamente!",
        icon: "success"
      })
      navigate("/home")
    }).catch((e) => {
      withReactContent(Swal).fire({
        title: "Error!",
        text: e.response.data.message,
        icon: "error"
      })
    })
  }

  return (
    <div className="h-screen w-full flex flex-col bg-slate-100">
      <nav className="px-8 py-4 flex flex-row justify-start">
        <a href="/login">
          <img src="https://tmtcode.pro/logo-ok.png" alt="Logo Dashboard" />
        </a>
      </nav>
      <main className="flex flex-col justify-center items-center h-full">
        <div className="overflow-hidden w-3/4 rounded-3xl p-6 md:p-10 max-w-[600px] mx-auto bg-white">
          <p className="text-lg font-semibold mb-4">Iniciar Sesion</p>
          <p className="text-sm font-semibold">
            No tienes cuenta?{" "}
            <a href="/sign-up" className="text-xs font-normal">
              Crearte una Cuenta!
            </a>
          </p>
          <div className="flex flex-col gap-4 mt-8">
            <FormControl>
              <FormLabel>Usuario</FormLabel>
              <Input value={username} onChange={(event) => setUsername(event.target.value)} isRequired type="email" />
            </FormControl>
            <FormControl>
              <FormLabel>Clave</FormLabel>
              <Input value={password} onChange={(event) => setPassword(event.target.value)} isRequired type="password" />
            </FormControl>
            <Button
              mt={4}
              variant={"solid"}
              onClick={() => {
                login()
              }}
            >
              Iniciar Sesion
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
