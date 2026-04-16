"use client";

import { useState } from "react";

export default function CreateChatbotPage() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    role: "Support Client",
    tone: "Professionnel",
    example: "Bonjour ! En quoi puis-je vous être utile ?",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("DATA:", form);

    // 👉 ici tu connectes avec ton backend (FastAPI)
    // fetch("http://localhost:8000/chatbots", { method: "POST", ... })

    alert("Chatbot créé !");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        
        <h1 className="text-2xl font-bold mb-2">
          Créer un nouveau chatbot
        </h1>
        <p className="text-gray-500 mb-6">
          Configurez votre assistant conversationnel
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Nom */}
          <div>
            <label className="block font-medium mb-1">
              Nom du chatbot *
            </label>
            <input
              type="text"
              name="name"
              placeholder="Ex: Assistant Client Pro"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
              required
            />
            <p className="text-sm text-gray-400">
              Le nom qui identifiera votre chatbot
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Description *
            </label>
            <textarea
              name="description"
              placeholder="Ex: Assistant de support client disponible 24/7..."
              value={form.description}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
              required
            />
            <p className="text-sm text-gray-400">
              Décrivez brièvement le rôle de votre chatbot
            </p>
          </div>

          {/* Rôle */}
          <div>
            <label className="block font-medium mb-1">
              Rôle du chatbot *
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
            >
              <option>Support Client</option>
              <option>Assistant Commercial</option>
              <option>Coach</option>
            </select>
          </div>

          {/* Ton */}
          <div>
            <label className="block font-medium mb-1">
              Ton de communication *
            </label>
            <select
              name="tone"
              value={form.tone}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
            >
              <option>Professionnel</option>
              <option>Amical</option>
              <option>Fun</option>
            </select>
          </div>

          {/* Exemple */}
          <div>
            <label className="block font-medium mb-1">
              Exemple de réponse
            </label>
            <textarea
              name="example"
              value={form.example}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 bg-gray-50"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="px-4 py-2 rounded-lg border"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-black text-white rounded-lg hover:opacity-90"
            >
              🔒 Créer le chatbot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}