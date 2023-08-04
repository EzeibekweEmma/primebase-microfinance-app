import { useState } from "react";
import {
  Bars3Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Header() {
  const [dropDown, setDropDown] = useState(false);
  const [servicesDropDown, setServicesDropDown] = useState(false);
  const menuLinks = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    {
      id: 2,
      name: "Our Services",
      isDropdown: true,
      link: [
        {
          id: 4,
          name: "Request for Loan",
          link: "request",
        },
        {
          id: 5,
          name: "See All Loan Requests",
          link: "all-loans",
        },
        {
          id: 6,
          name: "View Repayment Schedule",
          link: "repayment/:transactionId",
        },
      ],
    },
    {
      id: 3,
      name: "About",
      link: "/about",
    },
  ];

  const linkStyle = "p-1 font-semibold cursor-pointer hover:border-b-2";
  const dropDownStyle =
    "flex flex-col absolute shadow-lg py-2 px-4 z-10 \
  rounded-b-lg top-0 gap-y-2 bg-white";

  const menu = menuLinks.map((link) => {
    return (
      <Link
        to={link.link}
        className={`${linkStyle} ${
          link?.isDropdown && "flex items-center space-x-0.5 relative"
        }`}
        key={link.id}
        onClick={
          link?.isDropdown
            ? () => setServicesDropDown((prev) => !prev)
            : () => setDropDown(false)
        }
      >
        <span>{link.name}</span>
        {link?.isDropdown &&
          (servicesDropDown ? (
            <ChevronDownIcon className="w-3 h-3 mt-1 stroke-2" />
          ) : (
            <ChevronRightIcon className="w-3 h-3 mt-1 stroke-2" />
          ))}
        {/* mapping through menus menu drop down */}
        {link?.isDropdown && servicesDropDown && (
          <div className={`${dropDownStyle} -left-20 top-9 w-64`}>
            {link.link.map((link) => (
              <Link
                to={link.link}
                className={`${linkStyle}`}
                key={link.id}
                onClick={() => setServicesDropDown(true)}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        )}
      </Link>
    );
  });

  return (
    <header className="flex justify-center bg-white shadow-md">
      <section className="flex justify-between w-[80vw] items-center py-3">
        <Link to="/" className="font-semibold text-lg">
          PrimeBase
        </Link>
        {/* Desktop Mode */}
        <div className="sm:block hidden">
          <nav className="flex gap-3 md:gap-5 items-center">{menu}</nav>
        </div>
        {/* Mobile Mode */}
        <div className="sm:hidden flex relative">
          <div>
            <button onClick={() => setDropDown((prev) => !prev)}>
              {dropDown ? (
                <XMarkIcon className="h-7 w-7 mt-2" />
              ) : (
                <Bars3Icon className="h-7 w-7 mt-2" />
              )}
            </button>
            {/* Menu */}
            {dropDown && (
              <nav className={`${dropDownStyle} -left-[9.2rem]`}>{menu}</nav>
            )}
          </div>
        </div>
      </section>
    </header>
  );
}
