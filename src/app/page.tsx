"use client";

import { mockClients } from "@/lib/mocks/clients";
import { mockInvoices } from "@/lib/mocks/invoices";
import { mockProjects } from "@/lib/mocks/projects";
import {
  ChartNoAxesCombined,
  FileText,
  FolderKanban,
  TrendingDown,
  TrendingUp,
  Users as UsersIcon,
} from "lucide-react";
import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const PRIMARY = "#5214FF";
const GREEN = "#16A34A";
const RED = "#DC2626";
const AMBER = "#F59E0B";
const MUTED = "#9CA3AF";

function formatEUR(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, m: number) {
  const r = new Date(d);
  r.setMonth(r.getMonth() + m);
  return r;
}
function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

export default function Home() {
  const today = new Date();

  // ---- Aggregations from mocks ----
  const {
    revenueThisMonth,
    revenueLastMonth,
    deltaPct,
    monthlySeries,
    statusPie,
    counts,
  } = useMemo(() => {
    const invoices = mockInvoices.map((i) => ({
      ...i,
      createdAt: new Date(i.createdDate),
      dueAt: new Date(i.dueDate),
    }));

    // Revenue this/last month = sum of PAID invoices created in the month
    const thisMonthStart = startOfMonth(today);
    const lastMonthStart = startOfMonth(addMonths(today, -1));

    const revenueThisMonth = invoices
      .filter(
        (i) => i.status === "paid" && sameMonth(i.createdAt, thisMonthStart)
      )
      .reduce((sum, i) => sum + i.amount, 0);

    const revenueLastMonth = invoices
      .filter(
        (i) => i.status === "paid" && sameMonth(i.createdAt, lastMonthStart)
      )
      .reduce((sum, i) => sum + i.amount, 0);

    const deltaPct =
      revenueLastMonth === 0
        ? null
        : Math.round(
            ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100
          );

    // Monthly revenue series (paid only), from first revenue month up to 12 months max
    const firstPaid = invoices
      .filter((i) => i.status === "paid")
      .map((i) => i.createdAt)
      .sort((a, b) => a.getTime() - b.getTime())[0];

    const startBase = firstPaid ? startOfMonth(firstPaid) : startOfMonth(today);
    const monthsBack = 11; // up to 12 months
    let start = addMonths(startOfMonth(today), -monthsBack);
    if (start < startBase) start = startBase;

    const monthKeys: string[] = [];
    const monthDates: Date[] = [];
    for (let d = new Date(start); d <= thisMonthStart; d = addMonths(d, 1)) {
      monthDates.push(new Date(d));
      monthKeys.push(`${d.getFullYear()}-${d.getMonth() + 1}`);
    }

    const revenueByKey = new Map<string, number>();
    for (const inv of invoices) {
      if (inv.status !== "paid") continue;
      const k = `${inv.createdAt.getFullYear()}-${
        inv.createdAt.getMonth() + 1
      }`;
      revenueByKey.set(k, (revenueByKey.get(k) ?? 0) + inv.amount);
    }

    const monthLabel = (d: Date) =>
      d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });

    const monthlySeries = monthDates.map((d) => {
      const k = `${d.getFullYear()}-${d.getMonth() + 1}`;
      return {
        name: monthLabel(d),
        value: revenueByKey.get(k) ?? 0,
      };
    });

    // Status pie: paid / pending / overdue
    const paidCount = invoices.filter((i) => i.status === "paid").length;
    const pendingCount = invoices.filter(
      (i) => i.status === "pending" && i.dueAt >= today
    ).length;
    const overdueCount = invoices.filter(
      (i) => i.status === "pending" && i.dueAt < today
    ).length;

    const statusPie = [
      { name: "Payées", value: paidCount, color: GREEN },
      { name: "En attente", value: pendingCount, color: AMBER },
      { name: "En retard", value: overdueCount, color: RED },
    ];

    const counts = {
      clients: mockClients.length,
      projects: mockProjects.length,
      invoices: mockInvoices.length,
    };

    return {
      revenueThisMonth,
      revenueLastMonth,
      deltaPct,
      monthlySeries,
      statusPie,
      counts,
    };
  }, [today]);

  return (
    <main className="min-h-[calc(100vh-5rem)] p-6">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold text-gray-900">
          Tableau de bord
        </h1>
        <p className="text-gray-500">Vue d&apos;ensemble de votre activité</p>
      </div>

      {/* Bento cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* CA du mois */}
        <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="absolute right-4 top-4">
            <ChartNoAxesCombined className="w-4 h-4 text-[#5214FF]" />
          </div>

          <div className="text-sm text-gray-600">
            Chiffre d&apos;affaires du mois
          </div>

          <div className="mt-6 text-3xl font-semibold text-gray-900">
            {formatEUR(revenueThisMonth)}
          </div>

          <div className="mt-4 flex items-center gap-1 text-xs">
            {deltaPct === null ? (
              <span className="text-gray-400">
                — aucune donnée le mois dernier
              </span>
            ) : deltaPct > 0 ? (
              <>
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-green-600">
                  +{deltaPct}% par rapport au mois dernier
                </span>
              </>
            ) : deltaPct < 0 ? (
              <>
                <TrendingDown className="w-4 h-4 text-red-600" />
                <span className="text-red-600">
                  {deltaPct}% par rapport au mois dernier
                </span>
              </>
            ) : (
              <span className="text-gray-400">
                inchangé par rapport au mois dernier
              </span>
            )}
          </div>
        </div>

        {/* Clients */}
        <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="absolute right-4 top-4">
            <UsersIcon className="w-4 h-4 text-[#5214FF]" />
          </div>
          <div className="text-sm text-gray-600">Clients</div>
          <div className="mt-6 text-3xl font-semibold text-gray-900">
            {counts.clients}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Total dans votre base
          </div>
        </div>

        {/* Projets */}
        <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="absolute right-4 top-4">
            <FolderKanban className="w-4 h-4 text-[#5214FF]" />
          </div>
          <div className="text-sm text-gray-600">Projets</div>
          <div className="mt-6 text-3xl font-semibold text-gray-900">
            {counts.projects}
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Tous statuts confondus
          </div>
        </div>

        {/* Factures */}
        <div className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="absolute right-4 top-4">
            <FileText className="w-4 h-4 text-[#5214FF]" />
          </div>
          <div className="text-sm text-gray-600">Factures</div>
          <div className="mt-6 text-3xl font-semibold text-gray-900">
            {counts.invoices}
          </div>
          <div className="mt-4 text-xs text-gray-500">Générées au total</div>
        </div>
      </section>

      {/* Charts */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        {/* CA mensuel (12 derniers mois/depuis 1er mois payé) */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Chiffre d&apos;affaires mensuels
            </h2>
            <p className="text-sm text-gray-500">Sur les derniers mois</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={monthlySeries}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="caFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={PRIMARY} stopOpacity={0.35} />
                    <stop
                      offset="100%"
                      stopColor={PRIMARY}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={MUTED}
                  opacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                />
                <YAxis
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  tickFormatter={(v) => `${Math.round(v / 1000)}k€`}
                />
                <Tooltip
                  formatter={(v: number) => [formatEUR(v), "CA"]}
                  labelStyle={{ color: "#111827" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={PRIMARY}
                  strokeWidth={2}
                  fill="url(#caFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Camembert statuts factures */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="mb-2">
            <h2 className="text-lg font-semibold text-gray-900">
              Statut des factures
            </h2>
            <p className="text-sm text-gray-500">Répartition par statut</p>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusPie}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                >
                  {statusPie.map((entry, idx) => (
                    <Cell key={idx} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip formatter={(v: number, n: string) => [`${v}`, n]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>
    </main>
  );
}
