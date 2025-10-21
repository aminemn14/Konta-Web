import { Project } from "@/types";

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "Pièce Auto Express",
    description: "Identité visuelle d'un garage auto",
    clientId: "1",
    status: "completed",
    startDate: "2024-11-07",
    dueDate: "2025-04-09",
    tasks: [
      {
        id: "1",
        title: "Mise en place de la charte graphique",
        completed: true,
      },
      { id: "2", title: "Création du logo et des variantes", completed: true },
      { id: "3", title: "Création des flyers et mockups", completed: true },
      { id: "4", title: "Création des cartes de visite", completed: true },
    ],
    notes: "",
    images: [
      "https://amine-moumen.lon1.cdn.digitaloceanspaces.com/portfolio/piecesautoexpress-project.webp",
    ],
    invoiceIds: ["1"],
  },
  {
    id: "2",
    title: "Import Beauty",
    description: "E-commerce de produits de beauté",
    clientId: "2",
    status: "completed",
    startDate: "2024-09-19",
    dueDate: "2024-11-19",
    tasks: [
      {
        id: "1",
        title: "Brief initial et analyse des besoins",
        completed: true,
      },
      {
        id: "2",
        title: "Étude de l’univers visuel et moodboard",
        completed: true,
      },
      {
        id: "3",
        title: "Création du logo et de ses déclinaisons",
        completed: true,
      },
      {
        id: "4",
        title:
          "Définition de la charte graphique (couleurs, typographies, icônes)",
        completed: true,
      },
      {
        id: "5",
        title: "Conception des maquettes Figma (desktop & mobile)",
        completed: true,
      },
      {
        id: "6",
        title: "Développement du site WordPress avec WooCommerce",
        completed: true,
      },
      {
        id: "7",
        title: "Intégration des contenus et produits",
        completed: true,
      },
      {
        id: "8",
        title: "Configuration des moyens de paiement et livraison",
        completed: true,
      },
      {
        id: "9",
        title: "Tests fonctionnels (navigation, commandes, responsive)",
        completed: true,
      },
      {
        id: "10",
        title: "Optimisations SEO de base (métadonnées, alt, permaliens)",
        completed: true,
      },
      {
        id: "11",
        title: "Formation de la cliente à l’utilisation de WooCommerce",
        completed: true,
      },
      {
        id: "12",
        title: "Mise en ligne et validation finale",
        completed: true,
      },
    ],
    notes: "",
    images: [
      "https://amine-moumen.lon1.cdn.digitaloceanspaces.com/portfolio/importbeauty-project.webp",
    ],
    invoiceIds: ["2"],
  },
  {
    id: "3",
    title: "5min Many",
    description: "Ssite vitrine pour un beatmaker",
    clientId: "3",
    status: "completed",
    startDate: "2023-12-01",
    dueDate: "2024-01-10",
    tasks: [
      {
        id: "1",
        title: "Échange initial et définition des besoins",
        completed: true,
      },
      {
        id: "2",
        title: "Création du logo et de l’identité visuelle",
        completed: true,
      },
      {
        id: "3",
        title: "Définition de la palette de couleurs et typographies",
        completed: true,
      },
      {
        id: "4",
        title: "Conception des maquettes Figma du site",
        completed: true,
      },
      {
        id: "5",
        title: "Développement frontend sur mesure (HTML/CSS/JS)",
        completed: true,
      },
      {
        id: "6",
        title: "Intégration du lecteur audio pour écouter les beats",
        completed: true,
      },
      {
        id: "7",
        title: "Ajout des liens vers Beatstars et YouTube",
        completed: true,
      },
      {
        id: "8",
        title: "Optimisation responsive (mobile/tablette)",
        completed: true,
      },
      { id: "9", title: "Tests de compatibilité navigateurs", completed: true },
      { id: "10", title: "Livraison finale et mise en ligne", completed: true },
    ],
    notes: "",
    images: [
      "https://amine-moumen.lon1.cdn.digitaloceanspaces.com/portfolio/5minmany-project.webp",
    ],
    invoiceIds: ["3"],
  },
  {
    id: "4",
    title: "Jud3v Digital",
    description: "Identité visuelle d'une agence web",
    clientId: "4",
    status: "completed",
    startDate: "2024-01-08",
    dueDate: "2024-03-20",
    tasks: [
      {
        id: "1",
        title: "Analyse de l’identité existante et benchmark",
        completed: true,
      },
      {
        id: "2",
        title: "Création du nouveau logo (versions couleur et monochrome)",
        completed: true,
      },
      {
        id: "3",
        title: "Définition de la palette de couleurs",
        completed: true,
      },
      {
        id: "4",
        title: "Choix typographiques et hiérarchie des textes",
        completed: true,
      },
      {
        id: "5",
        title: "Création d’éléments visuels (icônes, pictogrammes, motifs)",
        completed: true,
      },
      {
        id: "6",
        title: "Mise en page de la charte graphique complète (PDF)",
        completed: true,
      },
      {
        id: "7",
        title: "Déclinaisons sur supports (web, réseaux sociaux, print)",
        completed: true,
      },
      {
        id: "8",
        title: "Présentation au client et ajustements finaux",
        completed: true,
      },
      {
        id: "9",
        title: "Livraison des fichiers source et exportés",
        completed: true,
      },
    ],
    notes: "",
    images: [
      "https://amine-moumen.lon1.cdn.digitaloceanspaces.com/portfolio/jud3v-project.webp",
    ],
    invoiceIds: ["4"],
  },
  {
    id: "5",
    title: "CM Cils",
    description: "Site vitrine d'une esthéticienne",
    clientId: "5",
    status: "in-progress",
    startDate: "2024-01-08",
    dueDate: "2024-03-20",
    tasks: [
      {
        id: "1",
        title: "Analyse de l’identité existante et benchmark",
        completed: true,
      },
      {
        id: "2",
        title: "Création du nouveau logo (versions couleur et monochrome)",
        completed: true,
      },
      {
        id: "3",
        title: "Définition de la palette de couleurs",
        completed: true,
      },
      {
        id: "4",
        title: "Choix typographiques et hiérarchie des textes",
        completed: true,
      },
      {
        id: "5",
        title: "Création d’éléments visuels (icônes, pictogrammes, motifs)",
        completed: true,
      },
      {
        id: "6",
        title: "Mise en page de la charte graphique complète (PDF)",
        completed: true,
      },
      {
        id: "7",
        title: "Déclinaisons sur supports (web, réseaux sociaux, print)",
        completed: true,
      },
      {
        id: "8",
        title: "Présentation au client et ajustements finaux",
        completed: true,
      },
      {
        id: "9",
        title: "Livraison des fichiers source et exportés",
        completed: true,
      },
      { id: "10", title: "Développement du site vitrine", completed: true },
      {
        id: "11",
        title: "Implémentation du module de réservation Planity",
        completed: false,
      },
      {
        id: "12",
        title: "Rédaction des textes (accueil, prestations, contact)",
        completed: false,
      },
      {
        id: "13",
        title: "Optimisation SEO de base (balises, vitesse, accessibilité)",
        completed: false,
      },
      { id: "14", title: "Mise en ligne finale du site", completed: false },
    ],
    notes: "",
    images: [
      "https://amine-moumen.lon1.cdn.digitaloceanspaces.com/portfolio/cmcils-project.webp",
    ],
    invoiceIds: ["5"],
  },
];
