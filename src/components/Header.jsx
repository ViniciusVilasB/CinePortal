import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
    AiOutlineMenu,
    AiOutlineClose,
} from "react-icons/ai";

export default function Header(){ 

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { to: '/', label: 'Home'},
        { to: '/movies', label: 'Filmes'},
        { to: '/genres', label: 'Gêneros'},
      ];

    return(
        <header className="flex w-full bg-minha-cor-1 text-white font-semibold justify-between items-center h-16 p-6
            transition-all duration-200 ease-in-out">

            <div className="flex items-center text-minha-cor-2 ">
                <h1 className="text-3xl font-normal">CinePortal</h1>
            </div>

            <div className="md:hidden hover:cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <AiOutlineClose size = {24} /> : <AiOutlineMenu size = {24} />}
            </div>

            <nav className={`absolute top-16 left-0 p-4 transition-all duration-200 ease-in-out md:static md:flex md:gap-6
                ${isMenuOpen ? 'block w-full bg-minha-cor-1': 'hidden'}`}>

                <ul className="flex flex-col md:flex-row gap-6">
                    {navItems.map(({ to, label, icon }) => (
                        <li key={to} className="button-nav">
                            <NavLink 
                                to={to}
                                className={'flex items-center gap-1'}
                                onClick={() => setIsMenuOpen(false)}>
                                {icon}
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>

            </nav>
        </header>
    )
}