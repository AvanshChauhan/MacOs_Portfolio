"use client";
import dayjs from "dayjs";
import { navIcons, navLinks } from "@/app/constants";
export default function Navbar() {
  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="apple logo" />
        <p className="font-bold">Avansh's portfolio</p>
        <ul>
            {navLinks.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
      </div>
      <div>
            <ul>
              {navIcons.map((icon)=>(
                <li key={icon.id}>
                  <img src={icon.img} alt="" />
                </li>
              ))}
            </ul>
            <time>{dayjs().format('ddd MMM D h:mm A')}</time>
      </div>
    </nav>
  );
}
