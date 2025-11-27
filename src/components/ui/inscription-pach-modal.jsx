import React, { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from './sheet';
import { Button } from './button';
import pachContent from 'entites/pach_content.json';

export default function InscriptionPachModal({ open, onClose }) {
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', telephone: '', message: '' });
  const [errors, setErrors] = useState({});

  function updateField(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: null }));
  }

  function validate() {
    const e = {};
    if (!form.nom || String(form.nom).trim().length < 2) e.nom = 'Nom requis';
    if (!form.prenom || String(form.prenom).trim().length < 2) e.prenom = 'Prénom requis';
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (!form.telephone || String(form.telephone).trim().length < 6) e.telephone = 'Téléphone requis';
    return e;
  }

  async function handleSubmit(e) {
    e && e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) return setErrors(v);
    setLoading(true);
    try {
      const res = await fetch('/api/inscription_pach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: form.nom, prenom: form.prenom, email: form.email, telephone: form.telephone, message: form.message })
      });
      const json = await res.json();
      if (res.ok && json && json.id) {
        setSuccessId(json.id);
        setForm({ nom: '', prenom: '', email: '', telephone: '', message: '' });
      } else {
        setErrors({ submit: (json && json.error) || 'Erreur serveur' });
      }
    } catch (err) {
      setErrors({ submit: err && err.message ? err.message : 'Erreur réseau' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Sheet open={!!open} onOpenChange={(v) => !v && onClose && onClose()}>
      <SheetContent className="max-w-2xl w-full">
        <SheetHeader>
          <SheetTitle>Inscription au Programme PACH</SheetTitle>
        </SheetHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
          {successId ? (
            <div className="p-4 bg-green-50 rounded">
              <h3 className="font-bold">Merci — inscription reçue</h3>
              <p className="text-sm">Votre inscription a été enregistrée (ID: <strong>{successId}</strong>).</p>
              <div className="mt-4">
                <Button onClick={() => { setSuccessId(null); onClose && onClose(); }}>
                  Fermer
                </Button>
              </div>
            </div>
          ) : (
            <>
              <details className="p-4 bg-gray-50 rounded border">
                <summary className="font-semibold cursor-pointer">Informations sur le PACH-BENIN (cliquez pour dérouler)</summary>
                <div className="mt-3 text-sm text-gray-700 space-y-3">
                  <p>{(pachContent && pachContent.heroParagraph) || 'Programme PACH - description indisponible.'}</p>

                  {pachContent && pachContent.avantages && (
                    <div>
                      <strong>Les avantages :</strong>
                      <ul className="list-disc ml-5 mt-1">
                        {pachContent.avantages.map((a, i) => <li key={i}>{a.title || a}</li>)}
                      </ul>
                    </div>
                  )}

                  {pachContent && pachContent.offres && (
                    <div>
                      <strong>Offres :</strong>
                      <ul className="list-disc ml-5 mt-1 text-sm">
                        {pachContent.offres.map((o, i) => (
                          <li key={o.id || i} className="mb-1">{o.nom} — {o.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pachContent && pachContent.etapes && (
                    <div>
                      <strong>Modalités & fréquence de paiement :</strong>
                      <ul className="list-disc ml-5 mt-1">
                        {pachContent.etapes.map((s) => (
                          <li key={s.step}><strong>{s.title}:</strong> {s.description}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {pachContent && pachContent.inscriptionDocuments && (
                    <div>
                      <strong>Pièces requises pour l'inscription :</strong>
                      <ul className="list-disc ml-5 mt-1">
                        {pachContent.inscriptionDocuments.map((d, i) => <li key={i}>{d}</li>)}
                      </ul>
                    </div>
                  )}
                </div>
              </details>

              <div className="mt-3" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input value={form.nom} onChange={(e) => updateField('nom', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                  {errors.nom && <div className="text-red-600 text-sm mt-1">{errors.nom}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input value={form.prenom} onChange={(e) => updateField('prenom', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                  {errors.prenom && <div className="text-red-600 text-sm mt-1">{errors.prenom}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input value={form.email} onChange={(e) => updateField('email', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                  {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                  <input value={form.telephone} onChange={(e) => updateField('telephone', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" />
                  {errors.telephone && <div className="text-red-600 text-sm mt-1">{errors.telephone}</div>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Message (optionnel)</label>
                <textarea value={form.message} onChange={(e) => updateField('message', e.target.value)} className="mt-1 block w-full border rounded px-3 py-2" rows={4} />
              </div>

              {errors.submit && <div className="text-red-600 text-sm">{errors.submit}</div>}

              <SheetFooter>
                <div className="flex gap-2">
                  <Button type="button" onClick={() => { onClose && onClose(); }} className="bg-gray-200 text-black">Annuler</Button>
                  <Button type="submit" onClick={handleSubmit} disabled={loading}>{loading ? 'Envoi...' : 'Soumettre l’inscription'}</Button>
                </div>
              </SheetFooter>
            </>
          )}
        </form>
      </SheetContent>
    </Sheet>
  );
}
