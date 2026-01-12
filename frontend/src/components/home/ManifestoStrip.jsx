import React from 'react';
import { manifestoText } from '../../data/mock';

const ManifestoStrip = () => {
  return (
    <section className="bg-[#141416] border-y border-[#27272a]">
      <div className="container-wide py-16 md:py-24">
        <p className="heading-section text-center text-[#f5f5f7] max-w-4xl mx-auto leading-tight">
          {manifestoText}
        </p>
      </div>
    </section>
  );
};

export default ManifestoStrip;
