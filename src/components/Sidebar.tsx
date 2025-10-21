"use client";

import { mockUser } from "@/lib/mocks/user";
import { motion } from "framer-motion";
import {
  ChartNoAxesCombined,
  FileText,
  FolderKanban,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { name: "Dashboard", icon: ChartNoAxesCombined, href: "#" },
  { name: "Clients", icon: Users, href: "#" },
  { name: "Projets", icon: FolderKanban, href: "#" },
  { name: "Factures", icon: FileText, href: "#" },
  { name: "Paramètres", icon: Settings, href: "#" },
];

export function Sidebar() {
  const user = mockUser;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between fixed h-screen">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-2 px-6 h-20 border-b border-gray-200">
          <img
            src="/logo-konta.svg"
            alt="Konta Logo"
            className="object-contain w-8 h-8"
          />
          <span className="font-semibold text-xl">Konta</span>
        </div>

        {/* Menu */}
        <nav className="flex flex-col mt-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-6 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <item.icon className="w-5 h-5 text-[#5214FF]" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Profil */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="flex items-center gap-3 p-6 border-t border-gray-100 cursor-pointer"
      >
        {/* TODO : Passer à la balise Image */}
        <img
          src={user.avatar}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="font-medium text-sm">
            {user.firstname} {user.lastname}
          </span>
          <span className="text-xs text-gray-500">Mon Profil</span>
        </div>
      </motion.div>
    </aside>
  );
}
