import { BsInstagram, BsLinkedin, BsGithub  } from "react-icons/bs";

export default function Footer(){
    return(
        <footer className="flex w-full bg-minha-cor-1 text-white items-center justify-center flex-col p-3 gap-2 mt-2">
            <h1>Desenvolvido por Vinicius Vilas Boas</h1>
            <div className="flex gap-4">
                <a
                    href="https://www.instagram.com/vinicius_vilasb/"
                    type="button"
                    target="blank"
                    className="rounded-full p-2 transition duration-150 ease-in-out hover:bg-minha-cor-2">
                    <BsInstagram size={24}/>
                </a>
                <a
                    href="https://github.com/ViniciusVilasB"
                    type="button"
                    target="blank"
                    className="rounded-full p-2 transition duration-150 ease-in-out hover:bg-minha-cor-2">
                    <BsGithub size={24}/>
                </a>
                <a
                    href="https://www.linkedin.com/in/vinicius-vilas/"
                    type="button"
                    target="blank"
                    className="rounded-full p-2 transition duration-150 ease-in-out hover:bg-minha-cor-2">
                    <BsLinkedin size={24}/>
                </a>
            </div>
        </footer>
    )
}