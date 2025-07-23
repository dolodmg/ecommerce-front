import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter(
  { subsets: ['latin'], 
    weight: ['100', '200', '300', '400', '500', '700', '900']
  }
);

export default function Navbar() {
  return (
    <nav className="bg-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-white tracking-wide">
        <Link href="/">Librería Creativa</Link>
      </div>
      <ul className={`${inter.className} flex space-x-12 text-sm font-light text-white`}>
        <li>
          <Link href="/books" className="text-white hover:text-orange-400 transition-colors">
            Libros
          </Link>
        </li>
        <li>
          <Link href="/albums" className="text-white hover:text-orange-400 transition-colors">
            Música
          </Link>
        </li>
        <li>
          <Link href="/boardgames" className="text-white hover:text-orange-400 transition-colors">
            Juegos de mesa
          </Link>
        </li>
        <li>
          <Link href="/" className="text-white hover:text-orange-400 transition-colors">
            Contacto
          </Link>
        </li>
      </ul>
    </nav>
  );
}