import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "../components/ui/alert";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // createMutation.mutate(formData);
  };

  const infos = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Rue 2460A/ Sêtovi, Cotonou - Bénin",
      color: "bg-red-100 text-red-700"
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+229 01 94 43 50 96",
      content2: "+229 01 60 42 27 83",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: Mail,
      title: "Email",
      content: "bricgroupdivers@gmail.com",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: Clock,
      title: "Horaires",
      content: "Lun-Ven: 8h-19h",
      content2: "Sam: 9h-15h",
      color: "bg-purple-100 text-purple-700"
    }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#2d7a4b] to-[#4a9d6f] text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contactez-Nous
            </h1>
            <p className="text-xl text-gray-100">
              Notre équipe est prête à répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {infos.map((info, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-xl transition-shadow">
                <div className={`w-14 h-14 ${info.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <info.icon className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-sm text-gray-600">{info.content}</p>
                {info.content2 && (
                  <p className="text-sm text-gray-600">{info.content2}</p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Envoyez-nous un Message
              </h2>

              {success && (
                <Alert className="mb-6 bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Nom Complet *</Label>
                    <Input
                      required
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      placeholder="Votre nom"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Email *</Label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="votre@email.com"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>Téléphone</Label>
                    <Input
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      placeholder="+229..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label>Sujet</Label>
                    <Input
                      value={formData.sujet}
                      onChange={(e) => setFormData({...formData, sujet: e.target.value})}
                      placeholder="Sujet de votre message"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label>Message *</Label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Décrivez votre projet ou votre demande..."
                    className="mt-2"
                    rows={6}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2d7a4b] hover:bg-[#4a9d6f] text-white"
                  size="lg"
                >
                  {"Envoyer le Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96 bg-gray-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7392917584397!2d2.4284!3d6.3667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMjInMDAuMCJOIDLCsDI1JzQyLjIiRQ!5e0!3m2!1sfr!2sbj!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Localisation BRIC GROUP Africa"
        />
      </section>
    </div>
  );
}