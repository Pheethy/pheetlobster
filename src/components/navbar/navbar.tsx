import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodepen } from "@fortawesome/free-brands-svg-icons";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Navbar() {
  const fName: string = "Pheet'Chy";
  const lName: string = "Unruffled";
  return (
    <nav className="w-full h-16 bg-black text-white">
      <div className="container mx-auto h-full flex justify-between items-center p-4">
        {/* logo */}
        <section className="flex text-white font-light text-sm">
          <FontAwesomeIcon
            icon={faCodepen}
            className="mr-2 text-white w-5 h-5"
          />
          <a href="/">ODOR</a>
        </section>

        {/* menus */}
        <section className="flex justify-between items-center gap-x-4 font-light text-sm">
          <Link
            href="/portal"
            className="hover:scale-110 transition duration-300"
          >
            Portal
          </Link>
          <Link
            href="/dashboard"
            className="hover:scale-110 transition duration-300"
          >
            Dashboard
          </Link>
          <Link
            href="/products"
            className="hover:scale-110 transition duration-300"
          >
            Products
          </Link>
          <Link href="#" className="hover:scale-110 transition duration-300">
            Support
          </Link>
        </section>

        {/* profile */}
        <section className="flex justify-center items-center gap-x-2 text-sm font-light">
          <img
            alt="profile"
            src="./mootoo.jpg"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col">
            <div>{fName}</div>
            <div>{lName}</div>
          </div>
          <button>
            <FontAwesomeIcon
              icon={faCaretDown}
              className="text-white w-4 h-4"
            />
          </button>
        </section>
      </div>
    </nav>
  );
}
