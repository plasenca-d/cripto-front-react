import instance from "@/utils/instance";
import { Button, FormControl, FormLabel, Input, Switch } from "@chakra-ui/react";
import { useState } from "react";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from "react-router-dom";
import instanceWithToken from "@/utils/instanceWithToken";

function SecuritySetting() {
  const navigate = useNavigate();
  let [clave, setClave] = useState("")
  let [newPasword, setNewPassword] = useState("")
  let [newRepeatPassword, setNewRepeatPassword] = useState("")

  const login = () => {
    instance.post("auth/login", { username: Cookies.get("username"), password: clave }).then((result) => {
      if(newPasword !== newRepeatPassword){
        withReactContent(Swal).fire({
          title: "Error!",
          text: 'Las nuevas contraseñas no coinciden!',
          icon: "error"
        })
        return
      }
      instanceWithToken.post('auth/update-password', { password: newPasword }).then((result) => {
        withReactContent(Swal).fire({
          title: "Exito!",
          text: 'Contraseña actualizada con exito!',
          icon: "success"
        })
      })
    }).catch((e) => {
      withReactContent(Swal).fire({
        title: "Error!",
        text: e.response.data.message,
        icon: "error"
      })
    })
  }

  return (
    <>
      <div className="flex flex-col gap-7 w-full sm:w-[50%] pt-5">
        <div className="space-y-4">
          <p className="text-lg">Actualizar tu clave!</p>
          <FormControl>
            <FormLabel htmlFor="password">Clave Actual</FormLabel>
            <Input
              onChange={(event) => setClave(event.target.value)}
              placeholder="**********"
              value={clave}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="repeatPassword">Nueva Clave</FormLabel>
            <Input
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="**********"
              value={newPasword}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="repeatPassword">Repite Nueva Clave</FormLabel>
            <Input
              onChange={(event) => setNewRepeatPassword(event.target.value)}
              placeholder="**********"
              value={newRepeatPassword}
            />
          </FormControl>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex flex-col w-full md:w-[300px]">
          <Button onClick={() => login()}>Asignar Nueva Clave</Button>
        </div>
      </div>
    </>
  );
}

export default SecuritySetting;
