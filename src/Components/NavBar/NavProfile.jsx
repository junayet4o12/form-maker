import React, { createElement, useState } from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { ImProfile } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
const NavProfile = ({ navbarColor }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const profileMenuItems = [
    {
      label: "Profile",
      icon: <ImProfile />,
    },
    {
      label: "Sign Out",
      icon: <LiaSignOutAltSolid />,
    },

  ];
  const handleAction = (input) => {
    if (input === "Profile") {
      navigate("/profile");
    } else if (input === "Sign Out") {
      const toastId = toast.loading("Logged Outing...");
      logOut()
        .then(() => {
          toast.success("Logged Out Successfully!", { id: toastId });
        })
        .catch((error) => {
          toast.error(error.code, { id: toastId });
        });
    }
    closeMenu();
  };
  return (
    <div className="">
      <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
        <MenuHandler>
          <Button
            variant="text"
            color="blue-gray"
            className="flex items-center gap-1 rounded-full overflow-hidden  py-0.5 pr-2 pl-0.5 lg:ml-auto">
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className={`border ${isMenuOpen && "border-primary"
                } w-12 h-12 p-0.5 rounded-full`}
              src={user?.photoURL}
            />
          </Button>
        </MenuHandler>
        <MenuList className={`p-1 px-3 z-40 ${!navbarColor ? 'bg-[#262525] border-primary text-black' : 'bg-primary border-white text-white'} transition-all duration-300`}>
          <div className={`border  w-max rounded-full p-[2px] mx-auto mt-1 ${!navbarColor ? 'border-primary' : ' border-white '}`}>
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={user?.photoURL}
              alt=""
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-center text-white">
              {user?.displayName}
            </p>
          </div>
          <hr className={`${!navbarColor ? 'border-white' : ' border-black'} my-1 border-[1.3px]`} />
          <div className="space-y-2 py-2">
            {profileMenuItems.map(({ label, icon }, key) => {
              const isLastItem = key === profileMenuItems.length - 1;
              return (
                <MenuItem
                  key={label}
                  onClick={() => handleAction(label)}
                  className={`flex items-center gap-2  rounded h-10 ${!navbarColor ? 'hover:bg-primary/30 focus:bg-primary/30 active:bg-primary/30' : 'hover:bg-white focus:bg-white active:bg-white'} ${isLastItem && `${navbarColor ? "bg-white text-black" : "bg-primary/20 "}`}`}>
                  <p className={`w-8 h-8 flex justify-center items-center text-xl  text-white`}>
                    {icon}
                  </p>
                  <Typography
                    as="span"
                    variant="small"
                    className="font-normal text-white"
                    color={isLastItem ? "red" : "inherit"}>
                    {label}
                  </Typography>
                </MenuItem>
              );
            })}
          </div>
        </MenuList>
      </Menu>
    </div>
  );
};

export default NavProfile;
