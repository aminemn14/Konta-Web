"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  FileText,
  FolderKanban,
  LogOut,
  Plus,
  Search,
  Settings,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

type Cmd = {
  id: string;
  label: string;
  icon: React.ElementType;
  group: "Navigation" | "Créer" | "Compte";
  href?: string;
  onRun?: () => void;
  keywords?: string[];
};

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const commands: Cmd[] = useMemo(
    () => [
      {
        id: "dashboard",
        label: "Ouvrir Dashboard",
        icon: FolderKanban,
        group: "Navigation",
        href: "/",
      },
      {
        id: "clients",
        label: "Aller à Clients",
        icon: Users,
        group: "Navigation",
        href: "/clients",
      },
      {
        id: "projets",
        label: "Aller à Projets",
        icon: FolderKanban,
        group: "Navigation",
        href: "/projets",
      },
      {
        id: "factures",
        label: "Aller à Factures",
        icon: FileText,
        group: "Navigation",
        href: "/factures",
      },
      {
        id: "settings",
        label: "Paramètres",
        icon: Settings,
        group: "Navigation",
        href: "/settings",
      },
      {
        id: "create-client",
        label: "Créer un client",
        icon: UserPlus,
        group: "Créer",
        onRun: () => console.log("Créer client"),
      },
      {
        id: "create-projet",
        label: "Créer un projet",
        icon: Plus,
        group: "Créer",
        onRun: () => console.log("Créer projet"),
      },
      {
        id: "create-facture",
        label: "Créer une facture",
        icon: FileText,
        group: "Créer",
        onRun: () => console.log("Créer facture"),
      },
      {
        id: "account",
        label: "Mon profil",
        icon: Settings,
        group: "Compte",
        href: "/settings",
      },
      {
        id: "logout",
        label: "Se déconnecter",
        icon: LogOut,
        group: "Compte",
        onRun: () => console.log("logout"),
      },
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }, [query, commands]);

  const grouped = useMemo(() => {
    const g: Record<string, Cmd[]> = {};
    for (const cmd of results)
      g[cmd.group] = g[cmd.group] ? [...g[cmd.group], cmd] : [cmd];
    return g;
  }, [results]);

  // Focus input + bloquer scroll du body
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc + clic extérieur
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        onClose();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] z-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            onClick={onClose}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-101 flex items-start justify-center pt-[18vh] px-4"
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={panelRef}
              className="
                w-full max-w-xl       
                rounded-lg border border-gray-200 bg-white shadow-xl
                overflow-hidden
              "
            >
              {/* Barre de recherche */}
              <div className="sticky top-0 z-10 bg-white flex items-center gap-2 px-3 py-2 border-b border-gray-200">
                <Search className="w-4 h-4 text-gray-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher… (clients, projets, factures, actions)"
                  className="flex-1 outline-none placeholder:text-gray-400 text-sm"
                />
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="p-1 rounded hover:bg-gray-100 transition"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {/* Liste scrollable */}
              <div className="max-h-[45vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent py-1">
                {Object.entries(grouped).map(([group, items]) => (
                  <div key={group} className="px-2 py-1">
                    <div className="px-2 pb-1 text-[10px] font-semibold text-gray-500 capitalize tracking-wide">
                      {group}
                    </div>
                    <ul className="flex flex-col">
                      {items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <li key={item.id}>
                            <button
                              onClick={() => {
                                if (item.href) router.push(item.href);
                                else item.onRun?.();
                                onClose();
                              }}
                              className="
                                w-full text-left px-2.5 py-2 rounded-md
                                flex items-center gap-2
                                transition hover:bg-gray-50 text-gray-800 text-sm
                              "
                            >
                              <Icon className="w-4 h-4 text-[#5214FF]" />
                              <span className="flex-1">{item.label}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}

                {results.length === 0 && (
                  <div className="px-6 py-8 text-center text-gray-500 text-sm">
                    Aucun résultat pour « {query} »
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
