"use client";

import { CommandPalette } from "@/components/CommandPalette";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Plus, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  onMenuClick?: () => void; // ouvre la sidebar mobile
}

export function Header({ onMenuClick }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMac, setIsMac] = useState<boolean | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Détecte Mac pour afficher ⌘K sans flicker
  useEffect(() => {
    const ua =
      (navigator as any).userAgentData?.platform || navigator.platform || "";
    setIsMac(/Mac/i.test(ua));
  }, []);

  // Raccourci ⌘K / Ctrl+K (hors champs)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = (e.key || "").toLowerCase();
      const isTyping = !!(e.target as HTMLElement)?.closest(
        "input, textarea, select, [contenteditable='true']"
      );
      if (isTyping) return;

      const isMacOS = /Mac/i.test(
        ((navigator as any).userAgentData?.platform ||
          navigator.platform ||
          "") + ""
      );
      const combo =
        (isMacOS && e.metaKey && key === "k") ||
        (!isMacOS && e.ctrlKey && key === "k");

      if (combo) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Click outside / ESC pour fermer le dropdown
  useEffect(() => {
    if (!showDropdown) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!dropdownRef.current) return;
      const target = e.target as Node;
      if (!dropdownRef.current.contains(target)) setShowDropdown(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowDropdown(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [showDropdown]);

  return (
    <>
      <header
        className="
          fixed top-0 right-0 left-0 lg:left-64
          h-20 z-40
          bg-white border-b border-gray-200
          flex items-center justify-between px-4 md:px-6 gap-3
        "
      >
        {/* Bouton menu (visible mobile) */}
        <div className="lg:hidden shrink-0">
          <button
            onClick={onMenuClick}
            aria-label="Ouvrir le menu"
            className="inline-flex items-center justify-center rounded-md border border-gray-200 w-10 h-10 hover:bg-gray-50 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Bouton qui ouvre la Command Palette (prend la place disponible) */}
        <div className="relative flex-1">
          <button
            id="open-cmdk"
            onClick={() => setOpen(true)}
            className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-md w-full text-left text-gray-500 hover:bg-gray-50 transition"
            aria-label="Ouvrir la recherche"
          >
            <Search className="w-4 h-4" />
            <span className="flex-1">Rechercher...</span>
            <AnimatePresence initial={false}>
              {isMac !== null && (
                <motion.kbd
                  key="kbd"
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 2 }}
                  transition={{ duration: 0.15 }}
                  className="text-[10px] font-medium text-gray-600 bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5"
                >
                  {isMac ? "⌘ K" : "Ctrl K"}
                </motion.kbd>
              )}
            </AnimatePresence>
          </button>
        </div>

        {/* Bouton Créer (icône seule) + dropdown */}
        <div className="relative shrink-0" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((s) => !s)}
            className="flex items-center justify-center bg-[#5214FF] text-white w-10 h-10 rounded-md shadow hover:brightness-95 transition"
            aria-haspopup="menu"
            aria-expanded={showDropdown}
            aria-label="Créer"
            title="Créer"
          >
            <Plus size={18} />
          </button>

          <AnimatePresence>
            {showDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden z-50 w-48"
                role="menu"
              >
                {["Nouveau client", "Nouveau projet", "Nouvelle facture"].map(
                  (label) => (
                    <button
                      key={label}
                      onClick={() => setShowDropdown(false)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                      role="menuitem"
                    >
                      {label}
                    </button>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </>
  );
}
