import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { base44 } from "@/api/base44Client";
import { useMutation } from "@tanstack/react-query";
import { Home, CheckCircle, ArrowLeft, Send } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const offresData = {
  "F2_40m2": { nom: "F2 - 40m²", prix: 4800000, acompte: 3500000 },
  "F3_90m2": { nom: "F3 - 90m²", prix: 10800000, acompte: 7000000 },
  "F4_100m2": { nom: "F4 - 100m²", prix: 12000000, acompte: 10000000 },
  "Locatif_4xF2": { nom: "4xF2 Locatifs", prix: 16000000, acompte: 14000000 },
};

export default function OffrePACH() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const typeFromUrl = urlParams.get('type') || 'F3_90m2';

  const [formData, setFormData] = useState({
    type_residence: typeFromUrl,
    nom_complet: "",
    email: "",
    telephone: "",
    adresse: "",
    profession: "",
    a_terrain: false,
    localisation_terrain: "",
    budget_disponible: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const createDemandeMutation = useMutation({
    mutationFn: (data) => base44.entities.DemandeDevisPACH.create(data),
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    createDemandeMutation.mutate(formData);
  };

  const offreSelectionnee = offresData[formData.type_residence];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl w-full"
        >
          <Card className="border-none shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Demande Envoyée avec Succès !
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Merci pour votre intérêt au Programme PACH. Notre équipe vous contactera dans les 48h pour discuter de votre projet.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => navigate(createPageUrl("Accueil"))}
                  className="bg-[#2d7a4b] hover:bg-[#4a9d6f]"
                >
                  Retour à l'Accueil
                </Button>
                <Button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      type_residence: typeFromUrl,
                      nom_complet: "",
                      email: "",
                      telephone: "",
                      adresse: "",
                      profession: "",
                      a_terrain: false,
                      localisation_terrain: "",
                      budget_disponible: "",
                      message: "",
                    });
                  }}
                  variant="outline"
                >
                  Nouvelle Demande
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <Button
          variant="ghost"
          onClick={() => navigate(createPageUrl("ProgrammePACH"))}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux offres
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-none shadow-xl mb-8">
            <CardHeader className="bg-gradient-to-r from-[#2d7a4b] to-[#4a9d6f] text-white">
              <CardTitle className="text-3xl flex items-center gap-3">
                <Home className="w-8 h-8" />
                Demande de Devis PACH
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {/* Récapitulatif Offre */}
              <div className="bg-[#e8f5e9] rounded-xl p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Offre Sélectionnée</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Type</p>
                    <p className="font-bold text-lg text-[#2d7a4b]">{offreSelectionnee.nom}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Prix Total</p>
                    <p className="font-semibold">{offreSelectionnee.prix.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Déboursé Sec (50%)</p>
                    <p className="font-bold text-xl text-[#2d7a4b]">{offreSelectionnee.acompte.toLocaleString('fr-FR')} FCFA</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Frais d'inscription</p>
                    <p className="font-semibold">50.000 FCFA</p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type de résidence */}
                <div>
                  <Label>Type de Résidence *</Label>
                  <Select 
                    value={formData.type_residence}
                    onValueChange={(value) => setFormData({...formData, type_residence: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="F2_40m2">F2 - 40m² (4.800.000 FCFA)</SelectItem>
                      <SelectItem value="F3_90m2">F3 - 90m² (10.800.000 FCFA)</SelectItem>
                      <SelectItem value="F4_100m2">F4 - 100m² (12.000.000 FCFA)</SelectItem>
                      <SelectItem value="Locatif_4xF2">4xF2 Locatifs (16.000.000 FCFA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Informations personnelles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Nom Complet *</Label>
                    <Input 
                      required
                      value={formData.nom_complet}
                      onChange={(e) => setFormData({...formData, nom_complet: e.target.value})}
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <Label>Téléphone *</Label>
                    <Input 
                      required
                      type="tel"
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      placeholder="+229..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Email</Label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="votre@email.com"
                    />
                  </div>
                  <div>
                    <Label>Profession</Label>
                    <Input 
                      value={formData.profession}
                      onChange={(e) => setFormData({...formData, profession: e.target.value})}
                      placeholder="Votre profession"
                    />
                  </div>
                </div>

                <div>
                  <Label>Adresse</Label>
                  <Input 
                    value={formData.adresse}
                    onChange={(e) => setFormData({...formData, adresse: e.target.value})}
                    placeholder="Votre adresse actuelle"
                  />
                </div>

                {/* Terrain */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terrain"
                    checked={formData.a_terrain}
                    onCheckedChange={(checked) => setFormData({...formData, a_terrain: checked})}
                  />
                  <Label htmlFor="terrain" className="cursor-pointer">
                    Je possède déjà un terrain
                  </Label>
                </div>

                {formData.a_terrain && (
                  <div>
                    <Label>Localisation du Terrain</Label>
                    <Input 
                      value={formData.localisation_terrain}
                      onChange={(e) => setFormData({...formData, localisation_terrain: e.target.value})}
                      placeholder="Où se trouve votre terrain ?"
                    />
                  </div>
                )}

                <div>
                  <Label>Budget Disponible (FCFA)</Label>
                  <Input 
                    type="number"
                    value={formData.budget_disponible}
                    onChange={(e) => setFormData({...formData, budget_disponible: e.target.value})}
                    placeholder="Votre budget actuel"
                  />
                </div>

                <div>
                  <Label>Message / Questions</Label>
                  <Textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Parlez-nous de votre projet, vos questions..."
                  />
                </div>

                {createDemandeMutation.isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Une erreur est survenue. Veuillez réessayer.
                    </AlertDescription>
                  </Alert>
                )}

                <Button 
                  type="submit" 
                  size="lg"
                  disabled={createDemandeMutation.isPending}
                  className="w-full bg-[#2d7a4b] hover:bg-[#4a9d6f] text-lg py-6"
                >
                  {createDemandeMutation.isPending ? (
                    "Envoi en cours..."
                  ) : (
                    <>
                      Envoyer ma Demande
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Champs obligatoires. Vos informations sont confidentielles.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}