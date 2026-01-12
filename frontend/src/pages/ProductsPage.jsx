import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Check, ChevronRight, Grid3X3, Users, Headphones, Route, Package } from 'lucide-react';
import { products, productDetails } from '../data/productDetails';
import { lifestyleCategories, accessories } from '../data/mock';
import '../styles/bluarmor.css';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('product'); // 'product', 'lifestyle', 'accessories'
  const [selectedLifestyle, setSelectedLifestyle] = useState(null);

  const getCategoryLabel = (category) => {
    switch(category) {
      case 'headset': return 'Helmet Headset';
      case 'intercom': return 'Mesh Intercom';
      case 'premium': return 'Premium Intercom';
      default: return 'Intercom';
    }
  };

  const getLifestyleIcon = (id) => {
    switch(id) {
      case 'highway-touring': return Route;
      case 'weekend-group': return Users;
      case 'one-on-one': return Users;
      case 'bluetooth-headset': return Headphones;
      default: return Grid3X3;
    }
  };

  const getFilteredProducts = () => {
    if (viewMode === 'lifestyle' && selectedLifestyle) {
      const category = lifestyleCategories.find(c => c.id === selectedLifestyle);
      if (category) {
        return products.filter(p => category.products.includes(p.id));
      }
    }
    return products;
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="bluarmor-app">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="min-h-[40vh] flex items-center justify-center bg-[#0a0a0b] pt-20">
          <div className="container-wide">
            <div className="max-w-4xl">
              <span className="text-label text-[#2563eb] mb-4 block">Explore The Armoury</span>
              <h1 className="heading-hero text-[#f5f5f7] mb-4">
                SELECT YOUR COMMS TOOLKIT
              </h1>
              <p className="text-body max-w-2xl">
                Solo Expeditions or Squad Adventures — We keep you connected.
              </p>
            </div>
          </div>
        </section>

        {/* View Mode Tabs */}
        <section className="bg-[#141416] border-y border-[#27272a] sticky top-20 z-40">
          <div className="container-wide py-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setViewMode('product'); setSelectedLifestyle(null); }}
                className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
                  viewMode === 'product'
                    ? 'text-[#f5f5f7] bg-[#2563eb]'
                    : 'text-[#a1a1aa] hover:text-[#f5f5f7] bg-[#1a1a1e]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Grid3X3 className="w-4 h-4" />
                  Choose by Product
                </span>
              </button>
              <button
                onClick={() => setViewMode('lifestyle')}
                className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
                  viewMode === 'lifestyle'
                    ? 'text-[#f5f5f7] bg-[#2563eb]'
                    : 'text-[#a1a1aa] hover:text-[#f5f5f7] bg-[#1a1a1e]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Choose by Lifestyle
                </span>
              </button>
              <button
                onClick={() => setViewMode('accessories')}
                className={`px-6 py-3 text-sm font-medium tracking-wide uppercase transition-all ${
                  viewMode === 'accessories'
                    ? 'text-[#f5f5f7] bg-[#2563eb]'
                    : 'text-[#a1a1aa] hover:text-[#f5f5f7] bg-[#1a1a1e]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Accessories
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* Lifestyle Categories */}
        {viewMode === 'lifestyle' && (
          <section className="bg-[#0a0a0b] border-b border-[#27272a]">
            <div className="container-wide py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {lifestyleCategories.map((category) => {
                  const IconComponent = getLifestyleIcon(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedLifestyle(selectedLifestyle === category.id ? null : category.id)}
                      className={`p-6 text-left border transition-all ${
                        selectedLifestyle === category.id
                          ? 'bg-[#1a1a1e] border-[#2563eb]'
                          : 'bg-[#141416] border-[#27272a] hover:border-[#3f3f46]'
                      }`}
                    >
                      <IconComponent className={`w-8 h-8 mb-4 ${
                        selectedLifestyle === category.id ? 'text-[#2563eb]' : 'text-[#71717a]'
                      }`} />
                      <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2">
                        {category.title}
                      </h3>
                      <p className="text-sm text-[#71717a]">
                        {category.description}
                      </p>
                      <p className="text-xs text-[#2563eb] mt-3">
                        {category.products.length} products
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Accessories Grid */}
        {viewMode === 'accessories' && (
          <section className="section-spacing bg-[#0a0a0b]">
            <div className="container-wide">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {accessories.map((accessory) => (
                  <div
                    key={accessory.id}
                    className="bg-[#141416] border border-[#27272a] hover:border-[#3f3f46] transition-all"
                  >
                    {/* Accessory Image Placeholder */}
                    <div className="aspect-square bg-[#1a1a1e] flex items-center justify-center border-b border-[#27272a]">
                      <Package className="w-16 h-16 text-[#27272a]" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-[#f5f5f7] mb-2">
                        {accessory.name}
                      </h3>
                      <p className="text-sm text-[#71717a] mb-4">
                        {accessory.description}
                      </p>
                      <p className="text-xl font-bold text-[#f5f5f7] mb-4">
                        {accessory.price}
                      </p>
                      <button className="btn-secondary w-full text-sm">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Products Grid */}
        {viewMode !== 'accessories' && (
          <section className="section-spacing bg-[#0a0a0b]">
            <div className="container-wide">
              {selectedLifestyle && (
                <div className="mb-8">
                  <p className="text-sm text-[#71717a]">
                    Showing {filteredProducts.length} products for "{lifestyleCategories.find(c => c.id === selectedLifestyle)?.title}"
                  </p>
                </div>
              )}
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
                        {getCategoryLabel(product.category)}
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
            </div>
          </section>
        )}

        {/* Compare Section */}
        <section className="bg-[#141416] border-t border-[#27272a]">
          <div className="container-wide py-16">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="heading-subsection text-[#f5f5f7] mb-4">
                CONQUER THE UNCHARTED WITHOUT LOSING TOUCH
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
