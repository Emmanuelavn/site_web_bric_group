import React from "react";
import { motion } from "framer-motion";
import { Award, Users, Building2, CheckCircle } from "lucide-react";
import CountUp from "components/ui/countup";

const stats = [
  { icon: Award, value: "10+", label: "Années d'Expérience" },
  { icon: Building2, value: "200+", label: "Projets Réalisés" },
  { icon: Users, value: "500+", label: "Clients Satisfaits" },
  { icon: CheckCircle, value: "100%", label: "Satisfaction Client" },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#e8f5e9] rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-8 h-8 text-[#2d7a4b]" />
              </div>
                <div className="text-4xl font-bold text-[#2d7a4b] mb-2">{
                  // If value contains non-digit (like % or +), keep suffix
                  typeof stat.value === 'string' && /[^0-9]/.test(stat.value)
                    ? <><CountUp end={stat.value} duration={1400} formatter={(v)=> (String(stat.value).replace(/[0-9]+/, String(v))) } /></>
                    : <CountUp end={parseInt(String(stat.value).replace(/\D/g,''),10) || 0} duration={1400} />
                }</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}