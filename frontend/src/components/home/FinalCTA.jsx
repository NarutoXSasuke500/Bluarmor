import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { finalCTA } from '../../data/mock';

const FinalCTA = () => {
  return (
    <section className="bg-[#141416] border-y border-[#27272a]">
      <div className="container-wide py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="heading-section text-[#f5f5f7] mb-8">
            {finalCTA.headline}
          </h2>
          <Link to="/products" className="btn-primary inline-flex">
            {finalCTA.cta}
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
