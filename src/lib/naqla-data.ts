export type Review = {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  cropType: string;
  date: string;
  comment: string;
  survivalImprovement: number;
};

export type Complaint = {
  id: string;
  name: string;
  location: string;
  date: string;
  category: "Packaging" | "Delivery" | "Efficacy" | "Application" | "Other";
  status: "Open" | "In Review" | "Resolved";
  subject: string;
  message: string;
};

export const initialReviews: Review[] = [
  {
    id: "r1",
    name: "Karim Belaid",
    role: "Pépiniériste",
    location: "Blida, Algérie",
    rating: 5,
    cropType: "Oliviers",
    date: "2025-04-12",
    comment:
      "Résultat impressionnant sur 800 jeunes oliviers transplantés en avril. Reprise rapide, racines vigoureuses dès la 3ème semaine. Je recommande Naقla sans hésiter.",
    survivalImprovement: 38,
  },
  {
    id: "r2",
    name: "Amina Cherif",
    role: "Maraîchère",
    location: "Tipaza, Algérie",
    rating: 4,
    cropType: "Tomates & Poivrons",
    date: "2025-05-03",
    comment:
      "Mes plants de tomates ont mieux supporté le repiquage cette saison. Moins de stress hydrique malgré la sécheresse de mai.",
    survivalImprovement: 27,
  },
  {
    id: "r3",
    name: "Coopérative El Amel",
    role: "Reboisement",
    location: "Djelfa, Algérie",
    rating: 5,
    cropType: "Pin d'Alep",
    date: "2025-03-22",
    comment:
      "Utilisé sur un chantier de reboisement de 12 hectares en zone aride. Taux de survie passé de 54% à 86%. Un produit qui change la donne.",
    survivalImprovement: 32,
  },
  {
    id: "r4",
    name: "Yacine Mansouri",
    role: "Arboriculteur",
    location: "Médéa, Algérie",
    rating: 4,
    cropType: "Pommiers",
    date: "2025-05-18",
    comment:
      "Application facile, gel bien dosé. J'ai noté une meilleure colonisation racinaire. Petit bémol sur la conservation en été.",
    survivalImprovement: 22,
  },
  {
    id: "r5",
    name: "Sara Bouzid",
    role: "Cultures ornementales",
    location: "Alger, Algérie",
    rating: 5,
    cropType: "Rosiers & Hibiscus",
    date: "2025-06-01",
    comment:
      "Mes ornementales reprennent en deux semaines au lieu d'un mois. Le trempage racinaire est devenu un réflexe.",
    survivalImprovement: 41,
  },
];

export const initialComplaints: Complaint[] = [
  {
    id: "c1",
    name: "Hicham Larbi",
    location: "Oran",
    date: "2025-05-09",
    category: "Packaging",
    status: "Resolved",
    subject: "Bouchon difficile à ouvrir",
    message:
      "Le bouchon du sachet 500mL était collé. Difficile à ouvrir sans outils. Sinon le produit fonctionne très bien.",
  },
  {
    id: "c2",
    name: "Ferme Bouchaoui",
    location: "Alger",
    date: "2025-05-21",
    category: "Delivery",
    status: "In Review",
    subject: "Livraison retardée de 8 jours",
    message:
      "Commande passée le 10/05, reçue le 28/05. Décalage avec notre planning de transplantation.",
  },
  {
    id: "c3",
    name: "Nadir Khelifi",
    location: "Sétif",
    date: "2025-06-02",
    category: "Application",
    status: "Open",
    subject: "Dose recommandée pour figuiers ?",
    message:
      "La fiche technique ne précise pas la dose pour les figuiers adultes en repiquage. Pouvez-vous m'orienter ?",
  },
];

export const stats = {
  totalReviews: 1247,
  avgRating: 4.7,
  resolvedComplaints: 94,
  avgSurvivalGain: 31,
};