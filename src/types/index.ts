export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  email?: string;
  phone?: string;
  isFreelance: boolean;
  status: 'prospect' | 'contacted' | 'signed';
}

export interface Invoice {
  id: string;
  clientId: string; // toujours lié à un client
  projectId?: string; // optionnel : la facture peut cibler un projet précis
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  createdDate: string;
  description: string;

  // Champs d'enrichissement (facultatifs, non stockés en "source of truth")
  client?: Client;
  project?: Project;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  role: string;
  companyName?: string;
  websiteDomain?: string;
  avatar?: string;
  activityLogo?: string;
  socials?: SocialLink[];
}

export interface SocialLink {
  platform: 'instagram' | 'linkedin' | 'facebook' | 'x' | 'tiktok';
  username: string;
}

export interface SummaryStats {
  totalClients: number;
  activeInvoices: number;
  upcomingTasks: number;
  monthlyRevenue: number;
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  clientId: string;
  status: 'planning' | 'in-progress' | 'completed';
  startDate: string;
  dueDate: string;
  tasks: Task[];
  notes?: string;
  images: string[];
  invoiceIds: string[];

  client?: Client;
}
