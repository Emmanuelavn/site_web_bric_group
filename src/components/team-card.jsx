import React from 'react';
import { Card } from 'components/ui/card';

export default function TeamCard({ name, role, bio, photo }) {
  return (
    <Card className="p-4 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold text-gray-700 overflow-hidden">
        {photo ? <img src={photo} alt={name} className="w-full h-full object-cover" /> : name.split(' ').map(n=>n[0]).slice(0,2).join('')}
      </div>
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-sm text-gray-600">{role}</div>
        {bio && <p className="text-sm text-gray-700 mt-2">{bio}</p>}
      </div>
    </Card>
  );
}
