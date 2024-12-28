import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ links, handleClick }) => (
  <div className="mt-2">
    {links.map((item) => (
      <NavLink
        key={item.name}
        to={item.to}
        className="flex flex-row px-4 justify-start items-center my-6 text-md font-medium text-gray-300 hover:text-white/75"
        onClick={() => handleClick && handleClick()}
      >
        {item.name}
      </NavLink>
    ))}
  </div>
);

const SideBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logo = "../../images/logo.png";

  const links = [
    { name: "Home", to: "/" },
    { name: "About", to: "/about" },
    { name: "Favourites", to: "/favourites" },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="md:flex hidden h-screen flex-col w-[240px] pt-8 px-4 bg-[#1b1515]">
        <img
          src={logo}
          alt="logo"
          className="w-full h-32 bg-origin-content rounded-full object-contain filter text-center invert-brightness-contrast"
        />
        <NavLinks links={links} />
      </div>

      {/* Mobile Sidebar Icon */}
      <div className="absolute md:hidden z-10 block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-10 h-10 mr-2 text-black"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-10 h-10 mr-2 text-black"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`absolute top-0 h-screen w-2/4 bg-gradient-to-tl from-white/10 to-[#141428] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        <img
          src={logo}
          alt="logo"
          className="w-60 h-32 object-contain mix-blend-exclusion invert-brightness-contrast"
        />
        <NavLinks links={links} handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default SideBar;
