import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PencilIcon } from "@/assets/icons";
import Cookies from 'js-cookie'
import instanceWithToken from "@/utils/instanceWithToken";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

function ProfileSetting() {
  let [user, setUser] = useState(null)
  let [firstName, setFirstName] = useState("")
  let [lastName, setLastName] = useState("")
  let [phone, setPhone] = useState("")
  let [document, setDocument] = useState("")
  let [sobreMi, setSobreMi] = useState("")


  const getUser = () => {
    instanceWithToken.get('auth/profile').then((result) => {
      let data = result.data.data
      setUser(result.data.data)
      setFirstName(data.firstName)
      setLastName(data.lastName)
      setPhone(data.phone)
      setDocument(data.document)
      setSobreMi(data.sobreMi)
    })
  }

  const update = () => {
    instanceWithToken.patch('users/' + user.id, { firstName, lastName, document, phone, sobreMi }).then((result) => {
      withReactContent(Swal).fire({
        title: "Exito!",
        text: 'Datos del usuario actualizado con exito!',
        icon: "success"
      })
      getUser()
    })
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <div className="flex flex-col md:flex-row gap-8 pt-5">
      <div className="w-full md:w-[200px] text-center">
        <div className="relative">
          <div className="flex items-center justify-center rounded-full overflow-hidden">
            <img
              src={Cookies.get("avatar")}
              className="w-full h-full object-cover aspect-auto"
              alt="avatar of username"
            />
          </div>
          <button type="button" className="absolute bottom-3 right-3 w-10 h-10 bg-primary-100 text-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <PencilIcon />
            </div>
          </button>
        </div>
        <b>Fecha de Ingreso</b> <br></br>
        {user ? format(new Date(user.created_at), 'dd-MM-yyyy HH:mm') : null}
      </div>
      {user &&
        <div className="w-full md:w-[calc(100%-200px-2rem)] space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormControl className="space-y-3">
              <FormLabel>Nombre</FormLabel>
              <Input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel >Apellido</FormLabel>
              <Input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Documento</FormLabel>
              <Input
                value={document}
                onChange={(event) => setDocument(event.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Celular</FormLabel>
              <Input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Correo</FormLabel>
              <Input disabled value={user.email} />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Usuario</FormLabel>
              <Input disabled value={user.username} />
            </FormControl>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-5">
            <FormControl className="space-y-3">
              <FormLabel>Sobre Mi</FormLabel>
              <Input
                value={sobreMi}
                onChange={(event) => setSobreMi(event.target.value)}
              />
            </FormControl>

            <Button onClick={() => update()}>Actualizar</Button>
          </div>
        </div>
      }
    </div>
  );
}

export default ProfileSetting;
