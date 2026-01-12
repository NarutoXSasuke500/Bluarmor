import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Check, ChevronRight, Loader2, Filter } from 'lucide-react';
import { products as allProductsList } from '../data/productDetails';
import '../styles/bluarmor.css';

const ProductsPage = () => {
  const [products, setProducts] = useState(allProductsList);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'headset', label: 'Headsets' },
    { id: 'intercom', label: 'Intercoms' },
    { id: 'premium', label: 'Premium' },
  ];

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'headset': return 'Helmet Headset';
      case 'intercom': return 'Mesh Intercom';
      case 'premium': return 'Premium Intercom';
      default: return 'Intercom';
    }
  };

  return (
    <div className="bluarmor-app">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="min-h-[40vh] flex items-center justify-center bg-[#0a0a0b] pt-20">
          <div className="container-wide">
            <div className="max-w-4xl">
              <span className="text-label text-[#2563eb] mb-4 block">2026 Armoury</span>
              <h1 className="heading-hero text-[#f5f5f7] mb-4">
                CHOOSE YOUR GEAR
              </h1>
              <p className="text-body max-w-2xl">
                From daily commuters to expedition tourers, find the perfect communication system for your riding style.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Bar */}
        <section className="bg-[#141416] border-y border-[#27272a] sticky top-20 z-40">
          <div className="container-wide py-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              <div className="flex items-center gap-2 text-[#71717a]">
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filter:</span>
              </div>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilter(cat.id)}
                  className={`px-4 py-2 text-sm font-medium tracking-wide uppercase whitespace-nowrap transition-colors ${
                    filter === cat.id
                      ? 'text-[#f5f5f7] bg-[#2563eb]'
                      : 'text-[#a1a1aa] hover:text-[#f5f5f7]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="section-spacing bg-[#0a0a0b]">
          <div className="container-wide">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group bg-[#141416] border border-[#27272a] hover:border-[#3f3f46] transition-all duration-200"
                  >
                    {/* Product Image Placeholder */}
                    <div className="aspect-[4/3] bg-[#1a1a1e] flex items-center justify-center border-b border-[#27272a]">
                      <div className="text-center">
                        <span className="text-4xl font-bold text-[#27272a]">
                          {product.name.split(' ')[1]}
                        </span>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      {/* Category Tag */}
                      <span className="inline-block text-[10px] font-medium tracking-wider uppercase text-[#2563eb] mb-2">
                        {getCategory(product) === 'headset' ? 'Helmet Headset' : 
                         getCategory(product) === 'premium' ? 'Premium Intercom' : 'Mesh Intercom'}
                      </span>

                      {/* Product Name */}
                      <h3 className="text-xl font-bold text-[#f5f5f7] mb-1 group-hover:text-[#2563eb] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#71717a] mb-4">
                        {product.tagline}
                      </p>

                      {/* Price */}
                      <p className="text-2xl font-bold text-[#f5f5f7] mb-4">
                        {product.price}
                      </p>

                      {/* Key Features */}
                      <ul className="space-y-2 mb-6">
                        {product.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                            <Check className="w-4 h-4 text-[#2563eb] flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* View Details */}
                      <div className="flex items-center gap-2 text-sm font-medium text-[#2563eb] group-hover:gap-3 transition-all">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Compare Section */}
        <section className="bg-[#141416] border-t border-[#27272a]">
          <div className="container-wide py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="heading-subsection text-[#f5f5f7] mb-4">
                NOT SURE WHICH ONE?
              </h2>
              <p className="text-body mb-8">
                Our products are designed for different riding styles. Solo commuters, pillion duos, weekend groups, or expedition tourers — there's a BluArmor for everyone.
              </p>
              <Link to="/support" className="btn-secondary">
                Get Help Choosing
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
