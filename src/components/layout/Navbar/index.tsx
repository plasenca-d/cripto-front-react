import SearchInput from "@/components/ui/input/SearchInput";
import ProfileButton from "./ProfileButton";
import NotifButton from "./NotifButton";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { SettingOIcon, MenuIcon } from "@/assets/icons";
import MobileSidebar from "./MobileSidebar";
import { useState } from "react";
import { userMenuLinks, adminMenuLinks } from "@/types/data/link";
import Cookies from "js-cookie";

function Navbar() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const locate = useLocation();

  const role = Cookies.get("role"); // Obtener el rol del usuario de las cookies

  // Seleccionar el conjunto de enlaces según el rol
  const menuLinks = role === "ADMIN" ? adminMenuLinks : userMenuLinks;

  // Encontrar el título del menú actual
  const currentMenu = menuLinks.find((item) => item.link === locate.pathname);

  const handleSubmit = (value: string) => {
    console.log(value);
  };

  return (
    <>
      <nav className="bg-white px-8 py-4 space-y-4">
        <div className="flex items-center justify-between gap-10">
          <button
            onClick={() => setShowMenu(true)}
            className="w-10 h-10 flex md:hidden items-center justify-center text-black"
          >
            <MenuIcon />
          </button>
          <p className="text-xl font-semibold text-primary-200">
            {currentMenu ? currentMenu.title : "Título no encontrado"}
          </p>
          <div className="flex items-center gap-4">
            {/* <SearchInput
              className="hidden md:flex w-[250px]"
              handleSubmit={handleSubmit}
            /> */}
            <div className="hidden md:flex">
              <Button variant="light" onClick={() => navigate("/setting")}>
                <SettingOIcon />
              </Button>
            </div>
            <NotifButton />
            <ProfileButton />
          </div>
        </div>
        <div className="block md:hidden">
          <SearchInput className="w-full" handleSubmit={handleSubmit} />
        </div>
      </nav>
      <MobileSidebar show={showMenu} handleClose={() => setShowMenu(false)} />
    </>
  );
}

Navbar.displayName = "Navbar";

export default Navbar;
