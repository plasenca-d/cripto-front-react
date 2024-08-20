import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { PencilIcon } from "@/assets/icons";
import Cookies from 'js-cookie';
import instanceWithToken from "@/utils/instanceWithToken";
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  document: string;
  sobreMi: string;
  created_at: string;
  email: string;
  username: string;
  avatar: string;
  role: string;
}

function ProfileSetting() {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [document, setDocument] = useState("");
  const [sobreMi, setSobreMi] = useState("");

  const getUser = async () => {
    try {
      const result = await instanceWithToken.get('auth/profile');
      const data = result.data.data as User;
      setUser(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setPhone(data.phone);
      setDocument(data.document);
      setSobreMi(data.sobreMi);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const update = async () => {
    try {
      if (user) {
        await instanceWithToken.patch(`users/${user.id}`, { firstName, lastName, document, phone, sobreMi });
        withReactContent(Swal).fire({
          title: "Éxito!",
          text: 'Datos del usuario actualizados con éxito!',
          icon: "success",
        });
        getUser();
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 pt-5">
      <div className="w-full md:w-[200px] text-center">
        <div className="relative">
          <div className="flex items-center justify-center rounded-full overflow-hidden">
            <img
              src={Cookies.get("avatar") ?? ''}
              className="w-full h-full object-cover aspect-auto"
              alt="avatar of username"
            />
          </div>
          <button
            type="button"
            className="absolute bottom-3 right-3 w-10 h-10 bg-primary-100 text-white rounded-full flex items-center justify-center"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <PencilIcon />
            </div>
          </button>
        </div>
        <b>Fecha de Ingreso</b> <br />
        {user ? format(new Date(user.created_at), 'dd-MM-yyyy HH:mm') : null}
      </div>
      {user && (
        <div className="w-full md:w-[calc(100%-200px-2rem)] space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <FormControl className="space-y-3">
              <FormLabel>Nombre</FormLabel>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Apellido</FormLabel>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Documento</FormLabel>
              <Input
                value={document}
                onChange={(e) => setDocument(e.target.value)}
              />
            </FormControl>
            <FormControl className="space-y-3">
              <FormLabel>Celular</FormLabel>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setSobreMi(e.target.value)}
              />
            </FormControl>
            <Button onClick={update}>Actualizar</Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSetting;
