import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
} from "@chakra-ui/react";
import avatar from "@/assets/images/avatar.png";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('name');
    Cookies.remove('email');
    Cookies.remove('id');
    Cookies.remove('role');
    Cookies.remove('token');
    Cookies.remove('sesion');
    Cookies.remove('avatar');

    navigate('/');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <button className="w-[50px] h-[50px] overflow-hidden flex items-center justify-center rounded-full">
          <img
            src={Cookies.get("avatar")}
            className="w-full h-full object-cover aspect-auto"
            alt="avatar of username"
          />
        </button>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
                <img
                  src={Cookies.get("avatar")}
                  className="w-full h-full object-cover aspect-auto"
                  alt="avatar of username"
                />
              </div>
              <div className="w-[calc(100%-3rem)]">
                <p className="leading-0">{Cookies.get("name")}</p>
                <p className="text-primary-400 text-sm leading-0">{Cookies.get("email")}</p>
              </div>
            </div>
          </PopoverHeader>
          <PopoverBody>
            <button onClick={logout} type="button" className="w-full py-3 px-4 text-magenta hover:bg-light">
              Cerrar Sesion
            </button>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default ProfileButton;
