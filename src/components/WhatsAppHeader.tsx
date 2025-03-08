
import React from 'react';
import { ArrowLeft, MoreVertical, Phone, Video } from 'lucide-react';
import { useAnimationOnMount } from '@/lib/animations';

const WhatsAppHeader: React.FC = () => {
  const isAnimated = useAnimationOnMount();

  return (
    <div className={`transition-default fixed top-0 left-0 right-0 z-10 bg-whatsapp-teal-green-dark text-white p-2 flex items-center gap-2 ${isAnimated ? 'opacity-100' : 'opacity-0'}`}>
      <button className="p-2 rounded-full hover:bg-white/10">
        <ArrowLeft size={20} />
      </button>
      
      <div className="flex-1 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
          JD
        </div>
        <div className="flex flex-col">
          <span className="font-medium">John Doe</span>
          <span className="text-xs text-white/70">online</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-full hover:bg-white/10">
          <Video size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <Phone size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};

export default WhatsAppHeader;
