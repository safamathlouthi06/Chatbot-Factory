"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  Plus, 
  FileText, 
  HelpCircle, 
  X, 
  Upload, 
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Globe
} from "lucide-react";

export default function BaseConnaissancePage() {
  const { chatbotId } = useParams();

  const [data, setData] = useState<any>(null);
  const [mode, setMode] = useState<"doc" | "faq" | null>(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [doc, setDoc] = useState({
    titre: "",
    contenu: "",
    file: null as File | null,
  });

  const [faq, setFaq] = useState({
    question: "",
    reponse: "",
  });

  // =========================
  // NOTIFICATION
  // =========================
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000);
  };

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/base/${chatbotId}`);
      const json = await res.json();
      setData(json);
    } catch (error) {
      showNotification('error', 'Erreur lors du chargement des données');
    }
  };

  useEffect(() => {
    if (chatbotId) fetchData();
  }, [chatbotId]);

  // =========================
  // ADD DOCUMENT
  // =========================
  const addDocument = async () => {
    if (!doc.titre.trim() || (!doc.contenu.trim() && !doc.file)) {
      showNotification('error', 'Veuillez remplir le titre et le contenu ou ajouter un fichier');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("chatbot_id", chatbotId as string);
    formData.append("titre", doc.titre);
    formData.append("contenu", doc.contenu);
    if (doc.file) formData.append("file", doc.file);

    try {
      await fetch("http://localhost:8000/document/", {
        method: "POST",
        body: formData,
      });
      
      setDoc({ titre: "", contenu: "", file: null });
      setMode(null);
      await fetchData();
      showNotification('success', 'Document ajouté avec succès !');
    } catch (error) {
      showNotification('error', "Erreur lors de l'ajout du document");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD FAQ
  // =========================
  const addFaq = async () => {
    if (!faq.question.trim() || !faq.reponse.trim()) {
      showNotification('error', 'Veuillez remplir la question et la réponse');
      return;
    }

    setLoading(true);
    try {
      await fetch("http://localhost:8000/faq/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatbot_id: chatbotId,
          question: faq.question,
          reponse: faq.reponse,
        }),
      });

      setFaq({ question: "", reponse: "" });
      setMode(null);
      await fetchData();
      showNotification('success', 'FAQ ajoutée avec succès !');
    } catch (error) {
      showNotification('error', "Erreur lors de l'ajout de la FAQ");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE ITEM
  // =========================
  const deleteDocument = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce document ?')) {
      try {
        await fetch(`http://localhost:8000/document/${id}`, { method: "DELETE" });
        await fetchData();
        showNotification('success', 'Document supprimé avec succès');
      } catch (error) {
        showNotification('error', 'Erreur lors de la suppression');
      }
    }
  };

  const deleteFaq = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette FAQ ?')) {
      try {
        await fetch(`http://localhost:8000/faq/${id}`, { method: "DELETE" });
        await fetchData();
        showNotification('success', 'FAQ supprimée avec succès');
      } catch (error) {
        showNotification('error', 'Erreur lors de la suppression');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        
        {/* NOTIFICATION */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <p>{notification.message}</p>
          </div>
        )}

        {/* HEADER */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Base de connaissances
              </h1>
              <p className="text-gray-500 mt-1">
                Gérez les documents et FAQ de votre chatbot
              </p>
            </div>

          
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total documents</p>
                <p className="text-3xl font-bold text-blue-900">{data?.documents?.length || 0}</p>
              </div>
              <FileText className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total FAQ</p>
                <p className="text-3xl font-bold text-purple-900">{data?.faq?.length || 0}</p>
              </div>
              <HelpCircle className="w-10 h-10 text-purple-400" />
            </div>
          </div>
        </div>

        {/* FORM DOCUMENT */}
        {mode === "doc" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">Ajouter un document</h2>
              <button onClick={() => setMode(null)} className="text-white hover:bg-white/10 rounded-lg p-1 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Titre *</label>
                <input
                  placeholder="Ex: Manuel d'utilisation"
                  value={doc.titre}
                  onChange={(e) => setDoc({ ...doc, titre: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contenu *</label>
                <textarea
                  placeholder="Contenu du document..."
                  value={doc.contenu}
                  onChange={(e) => setDoc({ ...doc, contenu: e.target.value })}
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fichier (optionnel)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <input
                    type="file"
                    onChange={(e) => setDoc({ ...doc, file: e.target.files?.[0] || null })}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {doc.file && <p className="text-sm text-green-600 mt-2">✓ {doc.file.name}</p>}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={addDocument}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-lg font-medium transition transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? 'Chargement...' : 'Enregistrer le document'}
                </button>

                <button
                  onClick={() => setMode(null)}
                  className="px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FORM FAQ */}
        {mode === "faq" && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-6 py-4 flex justify-between items-center">
              <h2 className="text-white font-semibold text-lg">Ajouter une FAQ</h2>
              <button onClick={() => setMode(null)} className="text-white hover:bg-white/10 rounded-lg p-1 transition">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                <input
                  placeholder="Ex: Comment réinitialiser mon mot de passe ?"
                  value={faq.question}
                  onChange={(e) => setFaq({ ...faq, question: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Réponse *</label>
                <textarea
                  placeholder="Réponse détaillée..."
                  value={faq.reponse}
                  onChange={(e) => setFaq({ ...faq, reponse: e.target.value })}
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={addFaq}
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 rounded-lg font-medium transition transform hover:scale-105 disabled:opacity-50"
                >
                  {loading ? 'Chargement...' : 'Enregistrer la FAQ'}
                </button>

                <button
                  onClick={() => setMode(null)}
                  className="px-6 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}

        {/* LISTES */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DOCUMENTS */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Documents
                <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                  {data?.documents?.length || 0}
                </span>
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {data?.documents?.length > 0 ? (
                data.documents.map((d: any) => (
                  <div key={d.id} className="p-4 hover:bg-gray-50 transition group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{d.titre}</h3>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">{d.contenu}</p>
                      </div>
                      <button
                        onClick={() => deleteDocument(d.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucun document</p>
                  <button onClick={() => setMode("doc")} className="mt-2 text-blue-600 hover:underline text-sm">
                    + Ajouter un document
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="font-semibold text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                FAQ
                <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                  {data?.faq?.length || 0}
                </span>
              </h2>
            </div>
            
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
              {data?.faq?.length > 0 ? (
                data.faq.map((f: any) => (
                  <div key={f.id} className="p-4 hover:bg-gray-50 transition group">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium text-purple-700">Q: {f.question}</h3>
                        <p className="text-sm text-gray-600 mt-1">R: {f.reponse}</p>
                      </div>
                      <button
                        onClick={() => deleteFaq(f.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-400">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>Aucune FAQ</p>
                  <button onClick={() => setMode("faq")} className="mt-2 text-purple-600 hover:underline text-sm">
                    + Ajouter une FAQ
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PROCHAINES ÉTAPES */}
        <div className="mt-10 border rounded-xl p-6 bg-white shadow-sm">
          <p className="font-semibold text-lg mb-4 text-gray-800">Prochaines étapes</p>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition cursor-pointer group">
              <MessageSquare className="w-5 h-5 text-blue-600 group-hover:scale-110 transition" />
              <span className="font-medium text-gray-700 group-hover:text-blue-700">Tester votre chatbot</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-green-50 hover:border-green-300 transition cursor-pointer group">
              <Globe className="w-5 h-5 text-green-600 group-hover:scale-110 transition" />
              <span className="font-medium text-gray-700 group-hover:text-green-700">Déployer sur votre site web</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}