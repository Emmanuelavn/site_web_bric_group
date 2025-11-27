import React, { useState } from 'react';
import { Button } from 'components/ui/button';
import { Link } from 'react-router-dom';

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result.split(',')[1];
      resolve({ filename: file.name, contentType: file.type, data: res });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function DevisPage() {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_TOTAL_PAYLOAD = 20 * 1024 * 1024; // ~20MB request body limit
  const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', country: 'Bénin', city: '', projectTypes: [], buildingType: '', message: '' });
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({ id: null, message: '' });

  function toggleProjectType(val) {
    setForm(f => {
      const next = (f.projectTypes || []).slice();
      const idx = next.indexOf(val);
      if (idx === -1) next.push(val); else next.splice(idx, 1);
      return { ...f, projectTypes: next.slice(0,3) };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const attachments = [];
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        // defensive: ensure file still within limits and allowed mime
        if (f.size > MAX_FILE_SIZE) continue;
        if (ALLOWED_MIMES.length && !ALLOWED_MIMES.includes(f.type)) continue;
        const base = await readFileAsBase64(f);
        attachments.push(base);
      }

      const payload = { ...form, attachments };
      const resp = await fetch('/api/devis', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data && data.error ? data.error : 'Erreur serveur');
      const sid = data.id || '—';
      setModalInfo({ id: sid, message: 'Soumission enregistrée avec succès.' });
      setShowModal(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', country: 'Bénin', city: '', projectTypes: [], buildingType: '', message: '' });
      setFiles([]);
    } catch (err) {
      setModalInfo({ id: null, message: 'Erreur: ' + (err.message || err) });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Demande de devis (sans engagement)</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Prénom*" required value={form.firstName} onChange={(e)=>setForm(f=>({...f, firstName:e.target.value}))} className="border rounded px-3 py-2" />
          <input placeholder="Nom*" required value={form.lastName} onChange={(e)=>setForm(f=>({...f, lastName:e.target.value}))} className="border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input type="email" placeholder="Email*" required value={form.email} onChange={(e)=>setForm(f=>({...f, email:e.target.value}))} className="border rounded px-3 py-2" />
          <input placeholder="Téléphone*" required value={form.phone} onChange={(e)=>setForm(f=>({...f, phone:e.target.value}))} className="border rounded px-3 py-2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Pays" value={form.country} onChange={(e)=>setForm(f=>({...f, country:e.target.value}))} className="border rounded px-3 py-2" />
          <input placeholder="Ville" value={form.city} onChange={(e)=>setForm(f=>({...f, city:e.target.value}))} className="border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block font-medium mb-2">Quel type de projet souhaitez-vous réaliser ? (max 3)</label>
          {['Construction neuve (maison, immeuble…)', 'Rénovation / réhabilitation', 'Travaux de gros œuvre', 'Travaux de second œuvre', 'Aménagement intérieur ou extérieur', 'Urbanisme / aménagement foncier', 'Autre'].map((opt)=> (
            <label key={opt} className="inline-flex items-center mr-4">
              <input type="checkbox" checked={(form.projectTypes||[]).indexOf(opt)!==-1} onChange={()=>toggleProjectType(opt)} />
              <span className="ml-2">{opt}</span>
            </label>
          ))}
        </div>

        <div>
          <input placeholder="Pour quel type de bâtiment ?" value={form.buildingType} onChange={(e)=>setForm(f=>({...f, buildingType:e.target.value}))} className="border rounded px-3 py-2 w-full" />
        </div>

        <div>
          <textarea placeholder="Votre demande* (précisez votre besoin)" required value={form.message} onChange={(e)=>setForm(f=>({...f, message:e.target.value}))} className="border rounded px-3 py-2 w-full" rows={6} />
        </div>

        <div>
            <label className="block mb-1">Pièces jointes (facultatif)</label>
            <div className="text-sm text-gray-600 mb-1">Formats acceptés: <strong>JPG, PNG, PDF</strong>. Taille max: <strong>10 MB par fichier</strong>. Taille totale recommandée &lt; 20 MB.</div>
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf,image/*"
              onChange={(e) => {
                const chosen = e.target.files ? Array.from(e.target.files) : [];
                const valid = [];
                const rejected = [];
                chosen.forEach((f) => {
                  if (f.size > MAX_FILE_SIZE) {
                    rejected.push({ name: f.name, reason: 'Trop volumineux (>10MB)', size: f.size });
                    return;
                  }
                  if (ALLOWED_MIMES.length && !ALLOWED_MIMES.includes(f.type)) {
                    rejected.push({ name: f.name, reason: 'Format non autorisé', size: f.size });
                    return;
                  }
                  valid.push(f);
                });
                setFiles(valid);
                setRejectedFiles(rejected);
              }}
            />

            {files.length > 0 && (
              <div className="mt-2 text-sm">
                <div className="font-medium">Fichiers prêts à l'envoi:</div>
                <ul className="list-disc ml-5">
                  {files.map((f) => (
                    <li key={f.name}>{f.name} — {(f.size / 1024 / 1024).toFixed(2)} MB</li>
                  ))}
                </ul>
              </div>
            )}

            {rejectedFiles.length > 0 && (
              <div className="mt-2 text-sm text-red-600">
                <div className="font-medium">Fichiers ignorés:</div>
                <ul className="list-disc ml-5">
                  {rejectedFiles.map((r) => (
                    <li key={r.name}>{r.name} — {r.reason}</li>
                  ))}
                </ul>
              </div>
            )}
        </div>

        <div>
          <label className="inline-flex items-center"><input type="checkbox" required /> <span className="ml-2">J'accepte d'être contacté par BRIC GROUP-AFRICA</span></label>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Envoyer la demande'}</Button>
          <Link to="/">Retour</Link>
        </div>
      </form>
      {/* Confirmation modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowModal(false)} />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="text-lg font-semibold">{modalInfo.message}</h3>
              {modalInfo.id && <div className="text-sm text-gray-600">ID de la soumission: <strong>{modalInfo.id}</strong></div>}
              <div className="mt-4 w-full flex gap-3">
                <Link to="/" className="w-full">
                  <Button className="w-full">Retour à l'accueil</Button>
                </Link>
                <button onClick={() => setShowModal(false)} className="w-full border rounded px-3 py-2">Fermer</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
