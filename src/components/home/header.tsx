import Link from 'next/link';

export default function HeaderNeobrutalism() {
  return (
    <nav className="bg-pastel-lemon text-black p-[2%] border-b-8">
      <div className="flex-col lg:flex-row flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-black tracking-tight text-black bg-pastel-pink px-6 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
          UNIVERSAL SCHOOL
        </div>

        {/* Navigation */}
        <div className="overflow-x-auto w-full lg:w-auto mt-4 lg:mt-0 lg:overflow-visible">
          <ul className="flex space-x-3 items-center font-bold uppercase text-sm">
            <li>
              <Link
                href="/"
                className="px-4 py-2 border-3 border-black bg-pastel-mint hover:bg-pastel-sky border-card"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="px-4 py-2 border-3 border-black bg-pastel-lavender hover:bg-pastel-pink border-card"
              >
                About
              </Link>
            </li>

            {/* Dropdown */}
            <li className="relative group">
              <Link
                href="#"
                className="px-4 py-2 border-3 border-black bg-pastel-peach hover:bg-pastel-sky border-card inline-block"
              >
                Academics
              </Link>
              <ul className="absolute hidden group-hover:block bg-white text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mt-2 w-52 z-50">
                <li>
                  <Link
                    href="/curriculum"
                    className="block px-6 py-4 hover:bg-pastel-mint border-b-2 border-black font-bold uppercase text-sm"
                  >
                    Curriculum
                  </Link>
                </li>
                <li>
                  <Link
                    href="/departments"
                    className="block px-6 py-4 hover:bg-pastel-sky font-bold uppercase text-sm"
                  >
                    Departments
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/programs"
                className="px-4 py-2 border-3 border-black bg-pastel-mint hover:bg-pastel-pink border-card"
              >
                Programs
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="px-4 py-2 border-3 border-black bg-pastel-lavender hover:bg-pastel-peach border-card"
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="px-4 py-2 border-3 border-black bg-pastel-peach hover:bg-pastel-mint border-card"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="bg-pastel-pink text-black px-4 py-2 border-card"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
