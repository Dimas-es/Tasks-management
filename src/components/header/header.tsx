"use client";
import Link from "next/link";
import { ThemeSwitch } from "../theme/theme-switch";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="bg-background border-b text-foreground py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          <div>
            <Link
              href="/"
              className="font-bold text-slate-800 dark:text-slate-50"
            >
              iTasks
            </Link>
          </div>
          <nav>
            <ul className="flex gap-3">
              <li>
                <Link
                  href="/"
                  className={`${
                    pathname === "/" ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/tasks"
                  className={`${
                    pathname === "/tasks" ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  Aktivitas
                </Link>
              </li>
              <li>
                <Link
                  href="/challenges"
                  className={`${
                    pathname === "/challenges"
                      ? "text-blue-500 font-semibold" : ""
                  }`}
                >
                  Misi
                </Link>
              </li>
            </ul>
          </nav>
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
};

export default Header;
