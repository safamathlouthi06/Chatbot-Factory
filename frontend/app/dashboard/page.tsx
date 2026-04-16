"use client";

import {
  Bot,
  MessageSquare,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
  Sparkles,
  Zap,
  BarChart3,
  MoreHorizontal,
  CheckCircle2,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* TITLE SECTION WITH GRADIENT */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-3xl" />
        <div className="relative">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Tableau de bord
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Bienvenue sur votre plateforme de création de chatbots intelligents
          </p>
        </div>
      </div>

      {/* STATS CARDS WITH GLASS EFFECT */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <StatCard
          title="Chatbots Actifs"
          value="2"
          total="3"
          icon={<Bot className="w-6 h-6 text-blue-500" />}
          gradient="from-blue-500 to-blue-600"
          trend="+12%"
        />
        <StatCard
          title="Conversations"
          value="1,247"
          icon={<MessageSquare className="w-6 h-6 text-green-500" />}
          gradient="from-green-500 to-green-600"
          trend="+8%"
        />
        <StatCard
          title="Messages Traités"
          value="8.2k"
          icon={<TrendingUp className="w-6 h-6 text-purple-500" />}
          gradient="from-purple-500 to-purple-600"
          trend="+23%"
        />
        <StatCard
          title="Utilisateurs"
          value="342"
          icon={<Users className="w-6 h-6 text-orange-500" />}
          gradient="from-orange-500 to-orange-600"
          trend="+5%"
        />
      </div>

      {/* QUICK ACTIONS WITH MODERN DESIGN */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Actions rapides
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Commencez à créer votre chatbot en quelques clics
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <ActionCard
            title="Nouveau Chatbot"
            desc="Créer un nouvel assistant intelligent"
            icon={<Plus className="w-5 h-5" />}
            color="blue"
            href="/dashboard/chatbots/create"
          />
          <ActionCard
            title="Gérer les Chatbots"
            desc="Voir tous vos assistants"
            icon={<Bot className="w-5 h-5" />}
            color="purple"
            href="/dashboard/chatbots"
          />
          <ActionCard
            title="Voir les Stats"
            desc="Analyser les performances"
            icon={<BarChart3 className="w-5 h-5" />}
            color="green"
            href="/dashboard/stats"
          />
        </div>
      </div>

      {/* RECENT CHATBOTS WITH IMPROVED DESIGN */}
      <div className="border border-gray-200 dark:border-gray-800 rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Chatbots récents</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Vos derniers assistants modifiés
            </p>
          </div>
          <Link
              href="/dashboard/chatbots"
              className="text-sm flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
            >
              Voir tout
              <ArrowRight className="w-4 h-4" />
        </Link>
        </div>

        <div className="space-y-3">
          <ChatbotRow
            name="Conseiller Commercial"
            desc="Assistant pour la conversion et les ventes"
            status="draft"
            lastEdited="Il y a 2 heures"
          />
          <ChatbotRow
            name="Assistant Client Pro"
            desc="Assistant de support client disponible 24/7"
            status="active"
            lastEdited="Il y a 5 heures"
          />
          <ChatbotRow
            name="Recruteur RH"
            desc="Assistant pour les candidats et employés"
            status="active"
            lastEdited="Hier"
          />
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* IMPROVED STATS CARD */
/* ========================= */

function StatCard({ title, value, total, icon, gradient, trend }: any) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {title}
            </p>
            <div className="flex items-baseline gap-1">
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {value}
              </p>
              {total && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  / {total}
                </p>
              )}
            </div>
            {trend && (
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-xs font-medium text-green-600 dark:text-green-400">
                  {trend}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  vs mois dernier
                </span>
              </div>
            )}
          </div>
          
          <div className="p-3 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= */
/* IMPROVED ACTION CARD */
/* ========================= */

function ActionCard({ title, desc, icon, color, href }: any) {
  const colors = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    green: "from-green-500 to-green-600",
  };

  return (
    <Link href={href || "#"} className="block">
      <div className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 cursor-pointer">
        
        <div className={`absolute inset-0 bg-gradient-to-br ${colors[color]} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
        
        <div className="relative p-5">
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colors[color]} bg-opacity-10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
            <div className="text-white">
              {icon}
            </div>
          </div>
          
          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
          
          <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300" />
          </div>
        </div>

      </div>
    </Link>
  );
}

/* ========================= */
/* IMPROVED CHATBOT ROW */
/* ========================= */

function ChatbotRow({ name, desc, status, lastEdited }: any) {
  const statusConfig = {
    active: {
      label: "Actif",
      icon: CheckCircle2,
      color: "text-green-700 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-500/10",
      border: "border-green-200 dark:border-green-500/20",
    },
    draft: {
      label: "Brouillon",
      icon: Clock,
      color: "text-yellow-700 dark:text-yellow-400",
      bg: "bg-yellow-50 dark:bg-yellow-500/10",
      border: "border-yellow-200 dark:border-yellow-500/20",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  const StatusIcon = config.icon;

  return (
    <div className="group flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all duration-200 bg-white dark:bg-gray-900">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Bot className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          {status === "active" && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
          )}
        </div>

        <div>
          <p className="font-semibold text-gray-900 dark:text-white mb-1">
            {name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {desc}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Modifié {lastEdited}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${config.bg} ${config.color} border ${config.border}`}>
          <StatusIcon className="w-3 h-3" />
          {config.label}
        </div>
        
        <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
}