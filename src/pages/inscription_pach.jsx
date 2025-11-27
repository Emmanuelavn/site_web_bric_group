import React, { useState } from 'react';
import { Button } from 'components/ui/button';
import { Link } from 'react-router-dom';
import pachContent from 'entites/pach_content.json';

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

export default function InscriptionPachPage() {
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_MIMES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', country: 'Bénin', city: '', projectTypes: [], buildingType: '', message: '', selectedOffer: '', paymentMethod: 'Mobile Money', paymentFrequency: '50% start', rib: '', guarantorName: '', guarantorPhone: '', fraisInscriptionPaye: false });
  const [files, setFiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  // document-specific files
  const [cinFile, setCinFile] = useState(null);
  const [conventionFile, setConventionFile] = useState(null);
  const [titreProprieteFile, setTitreProprieteFile] = useState(null);
  const [topographieFile, setTopographieFile] = useState(null);
  const [ribFile, setRibFile] = useState(null);
  const [photosIdFiles, setPhotosIdFiles] = useState([]);
  const [otherDocsFiles, setOtherDocsFiles] = useState([]);
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
      // generic attached files
      for (let i = 0; i < files.length; i++) {
        const f = files[i];
        if (f.size > MAX_FILE_SIZE) continue;
        if (ALLOWED_MIMES.length && !ALLOWED_MIMES.includes(f.type)) continue;
        const base = await readFileAsBase64(f);
        attachments.push(base);
      }

      // add document-specific files with a prefix in filename to identify type
      const docInputs = [
        { file: cinFile, prefix: 'CIN' },
        { file: conventionFile, prefix: 'CONVENTION' },
        { file: titreProprieteFile, prefix: 'TITRE_PROPRIETE' },
        { file: topographieFile, prefix: 'TOPOGRAPHIE' },
        { file: ribFile, prefix: 'RIB' }
      ];
      for (const di of docInputs) {
        if (di.file) {
          const f = di.file;
          if (f.size <= MAX_FILE_SIZE && (!ALLOWED_MIMES.length || ALLOWED_MIMES.includes(f.type))) {
            const base = await readFileAsBase64(f);
            base.filename = `${di.prefix}_${base.filename}`;
            attachments.push(base);
          }
        }
      }

      // photos id (multiple)
      for (let i = 0; i < photosIdFiles.length; i++) {
        const f = photosIdFiles[i];
        if (f.size > MAX_FILE_SIZE) continue;
        if (ALLOWED_MIMES.length && !ALLOWED_MIMES.includes(f.type)) continue;
        const base = await readFileAsBase64(f);
        base.filename = `PHOTO_ID_${base.filename}`;
        attachments.push(base);
      }

      // other docs
      for (let i = 0; i < otherDocsFiles.length; i++) {
        const f = otherDocsFiles[i];
        if (f.size > MAX_FILE_SIZE) continue;
        if (ALLOWED_MIMES.length && !ALLOWED_MIMES.includes(f.type)) continue;
        const base = await readFileAsBase64(f);
        base.filename = `OTHER_${base.filename}`;
        attachments.push(base);
      }

      // payment proof (if any)
      if (paymentProofFile) {
        const f = paymentProofFile;
        if (f.size <= MAX_FILE_SIZE && (!ALLOWED_MIMES.length || ALLOWED_MIMES.includes(f.type))) {
          const base = await readFileAsBase64(f);
          base.filename = `PAYMENT_PROOF_${base.filename}`;
          attachments.push(base);
        }
      }

      const payload = { ...form, attachments };
      const resp = await fetch('/api/inscription_pach', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data && data.error ? data.error : 'Erreur serveur');
      const sid = data.id || '—';
      setModalInfo({ id: sid, message: 'Inscription enregistrée avec succès.' });
      setShowModal(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', country: 'Bénin', city: '', projectTypes: [], buildingType: '', message: '', selectedOffer: '', paymentMethod: 'Mobile Money', paymentFrequency: '50% start', rib: '', guarantorName: '', guarantorPhone: '', fraisInscriptionPaye: false });
      setFiles([]);
      setCinFile(null);
      setConventionFile(null);
      setTitreProprieteFile(null);
      setTopographieFile(null);
      setRibFile(null);
      setPhotosIdFiles([]);
      setOtherDocsFiles([]);
    } catch (err) {
      setModalInfo({ id: null, message: 'Erreur: ' + (err.message || err) });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-2xl font-bold mb-4">Inscription au Programme PACH</h1>

      <details className="p-4 bg-gray-50 rounded border mb-6">
        <summary className="font-semibold cursor-pointer">Informations sur le PACH-BENIN (cliquez pour dérouler)</summary>
        <div className="mt-3 text-sm text-gray-700 space-y-3">
          <p>{(pachContent && pachContent.heroParagraph) || ''}</p>
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
        </div>
      </details>

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

        {/* Offre / Paiement */}
        <div>
          <label className="block font-medium mb-2">Choisissez une offre</label>
          <select value={form.selectedOffer} onChange={(e)=>setForm(f=>({...f, selectedOffer:e.target.value}))} className="border rounded px-3 py-2 w-full">
            <option value="">-- Sélectionner --</option>
            {(pachContent && pachContent.offres || []).map(o => (
              <option key={o.id} value={o.id}>{o.nom} — {o.description}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Modalité de paiement</label>
            <select value={form.paymentMethod} onChange={(e)=>setForm(f=>({...f, paymentMethod:e.target.value}))} className="border rounded px-3 py-2 w-full">
              <option>Mobile Money</option>
              <option>Bancaire</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-2">Fréquence / Modalité</label>
            <select value={form.paymentFrequency} onChange={(e)=>setForm(f=>({...f, paymentFrequency:e.target.value}))} className="border rounded px-3 py-2 w-full">
              <option value="50% start">50% au démarrage, 30% gros oeuvre, 10% finition, 10% garantie</option>
              <option value="monthly">Paiement mensuel</option>
            </select>
          </div>
        </div>

        <div>
          <input placeholder="RIB (numéro)" value={form.rib} onChange={(e)=>setForm(f=>({...f, rib:e.target.value}))} className="border rounded px-3 py-2 w-full" />
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded border">
          <h3 className="font-semibold mb-2">Frais d'inscription — 100 000 FCFA</h3>
          <p className="text-sm text-gray-700 mb-2">Nous ne recevons pas les paiements sur la plateforme. Payez par Mobile Money ou virement bancaire puis téléchargez la preuve ici.</p>
          <div className="text-sm mb-2">
            <strong>Mobile Money (exemple):</strong> +229 99 99 99 99 (BRIC GROUP)
          </div>
          <div className="text-sm mb-2">
            <strong>Virement bancaire (exemple):</strong> Banque: BIC BANK — Nom: BRIC GROUP AFRICA — RIB: 000-000-000
          </div>
          <div className="mt-2">
            <label className="inline-flex items-center"><input type="checkbox" checked={!!form.fraisInscriptionPaye} onChange={(e)=>setForm(f=>({...f, fraisInscriptionPaye: !!e.target.checked}))} /> <span className="ml-2">J'ai effectué le paiement des frais d'inscription (100 000 FCFA)</span></label>
          </div>
          <div className="mt-3">
            <label className="block mb-1">Télécharger la preuve de paiement (screenshot, PDF)</label>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" onChange={(e)=>setPaymentProofFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">CIN / Passeport (copie légalisée)</label>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf,image/*" onChange={(e)=>setCinFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>
          <div>
            <label className="block mb-1">Convention de vente (original - copie)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setConventionFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>
          <div>
            <label className="block mb-1">Titre de propriété / attestation</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setTitreProprieteFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>
          <div>
            <label className="block mb-1">Levé topographique (si disponible)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setTopographieFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>
          <div>
            <label className="block mb-1">RIB (preuve)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e)=>setRibFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)} />
          </div>
          <div>
            <label className="block mb-1">Photos d'identité (2)</label>
            <input type="file" accept=".jpg,.jpeg,.png" multiple onChange={(e)=>setPhotosIdFiles(e.target.files ? Array.from(e.target.files) : [])} />
          </div>
          <div className="md:col-span-2">
            <label className="block mb-1">Autres documents (facultatif)</label>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" multiple onChange={(e)=>setOtherDocsFiles(e.target.files ? Array.from(e.target.files) : [])} />
          </div>
        </div>

        {/* Guarantor fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Nom de l'avaliseur / garant (optionnel)</label>
            <input value={form.guarantorName || ''} onChange={(e)=>setForm(f=>({...f, guarantorName: e.target.value}))} className="border rounded px-3 py-2 w-full" />
          </div>
          <div>
            <label className="block mb-1">Téléphone du garant (optionnel)</label>
            <input value={form.guarantorPhone || ''} onChange={(e)=>setForm(f=>({...f, guarantorPhone: e.target.value}))} className="border rounded px-3 py-2 w-full" />
          </div>
        </div>

        <div className="mt-3">
          <label className="inline-flex items-center"><input type="checkbox" required /> <span className="ml-2">J'accepte d'être contacté par BRIC GROUP-AFRICA</span></label>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={loading}>{loading ? 'Envoi...' : 'Soumettre l’inscription'}</Button>
          <Link to="/programmepach">Retour</Link>
        </div>
      </form>

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
