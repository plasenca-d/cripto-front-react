import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";  // Importar useParams
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Cookies from 'js-cookie';
import instance from "@/utils/instance";

export function Register() {
    const navigate = useNavigate();
    const { referer: refererFromUrl } = useParams();  // Usar useParams para obtener el referer de la URL

    // Estado del formulario
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [referer, setReferer] = useState("");

    // Efecto para establecer el referer desde la URL si existe
    useEffect(() => {
        if (refererFromUrl) {
            setReferer(refererFromUrl);
        }
    }, [refererFromUrl]);

    const login = () => {
        if (!username || !password || !email || !firstName || !lastName || !referer) {
            withReactContent(Swal).fire({
                title: "Error!",
                text: "Debes poner todos los datos para registrarte!",
                icon: "error"
            });
            return;
        }

        let payload = { username, password, email, firstName, lastName, referer };
        instance.post("auth/register", payload).then((result) => {
            let data = result.data.data;
            console.log(data);
            Cookies.set("sesion", "true");
            Cookies.set("token", data.token);
            Cookies.set("name", data.firstName + ' ' + data.lastName);
            Cookies.set("username", data.username);
            Cookies.set("id", data.id);
            Cookies.set("role", data.role);
            Cookies.set("avatar", data.avatar);
            withReactContent(Swal).fire({
                title: "Éxito!",
                text: "Registro completado con éxito!",
                icon: "success"
            });
            navigate("/home");
        }).catch((e) => {
            withReactContent(Swal).fire({
                title: "Error!",
                text: e.response.data.message,
                icon: "error"
            });
        });
    };

    return (
        <div className="min-h-screen w-full flex flex-col bg-slate-100">
            <nav className="px-8 py-4 flex flex-row justify-start">
                <a href="/login">
                    <img src="https://tmtcode.pro/logo-ok.png" alt="Logo Dashboard" />
                </a>
            </nav>
            <main className="flex flex-col justify-center items-center flex-grow">
                <div className="overflow-hidden w-3/4 rounded-3xl p-6 md:p-10 max-w-[600px] mx-auto bg-white shadow-lg">
                    <p className="text-lg font-semibold mb-4">Regístrate</p>
                    <p className="text-sm font-semibold">
                        ¿Tienes una cuenta?{" "}
                        <Link to={'/'} className="text-xs font-normal">
                            ¡Inicia Sesión!
                        </Link>
                    </p>
                    <div className="flex flex-col gap-4 mt-8">
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input value={firstName} onChange={(event) => setFirstName(event.target.value)} isRequired type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Apellido</FormLabel>
                            <Input value={lastName} onChange={(event) => setLastName(event.target.value)} isRequired type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Correo</FormLabel>
                            <Input value={email} onChange={(event) => setEmail(event.target.value)} isRequired type="email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Referido</FormLabel>
                            <Input value={referer} onChange={(event) => setReferer(event.target.value)} isRequired type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Usuario</FormLabel>
                            <Input value={username} onChange={(event) => setUsername(event.target.value)} isRequired type="text" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Clave</FormLabel>
                            <Input value={password} onChange={(event) => setPassword(event.target.value)} isRequired type="password" />
                        </FormControl>
                        <Button
                            mt={4}
                            variant={"solid"}
                            onClick={login}
                        >
                            Registrarse
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
