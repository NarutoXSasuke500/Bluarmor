import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { Check, ChevronRight, ChevronLeft, Package, Zap, Shield, Wifi, Battery, Mic, Loader2 } from 'lucide-react';
import { productDetails } from '../data/productDetails';
import '../styles/bluarmor.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Get product from local data
    const productData = productDetails[productId];
    if (productData) {
      setProduct(productData);
    }
    setLoading(false);
  }, [productId]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'specs', label: 'Specifications' },
    { id: 'included', label: 'In The Box' },
  ];

  if (loading) {
    return (
      <div className="bluarmor-app min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bluarmor-app">
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section text-[#f5f5f7] mb-4">Product Not Found</h1>
            <Link to="/products" className="btn-primary">
              <ChevronLeft className="w-5 h-5" />
              Back to Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bluarmor-app">
      <Header />
      <main>
        {/* Breadcrumb */}
        <section className="bg-[#0a0a0b] pt-24 pb-4 border-b border-[#27272a]">
          <div className="container-wide">
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-[#71717a] hover:text-[#a1a1aa]">Home</Link>
              <span className="text-[#3f3f46]">/</span>
              <Link to="/products" className="text-[#71717a] hover:text-[#a1a1aa]">Products</Link>
              <span className="text-[#3f3f46]">/</span>
              <span className="text-[#f5f5f7]">{product.name}</span>
            </nav>
          </div>
        </section>

        {/* Product Hero */}
        <section className="bg-[#0a0a0b] py-16">
          <div className="container-wide">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="aspect-square bg-[#141416] border border-[#27272a] flex items-center justify-center">
                <div className="text-center">
                  <span className="text-8xl font-bold text-[#27272a]">
                    {product.name?.split(' ')[1]}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col justify-center">
                <span className="text-label text-[#2563eb] mb-2">
                  {product.idealFor || 'Motorcycle Communication'}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-[#f5f5f7] mb-4">
                  {product.name}
                </h1>
                <p className="text-xl text-[#a1a1aa] mb-6">
                  {product.tagline}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl font-bold text-[#f5f5f7]">
                    {product.price}
                  </span>
                  <span className="text-sm text-[#71717a] ml-2">incl. GST</span>
                </div>

                {/* Key Highlights */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {product.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#141416] border border-[#27272a] flex items-center justify-center">
                        {highlight.icon === 'wifi' && <Wifi className="w-5 h-5 text-[#2563eb]" />}
                        {highlight.icon === 'battery' && <Battery className="w-5 h-5 text-[#2563eb]" />}
                        {highlight.icon === 'mic' && <Mic className="w-5 h-5 text-[#2563eb]" />}
                        {highlight.icon === 'shield' && <Shield className="w-5 h-5 text-[#2563eb]" />}
                        {highlight.icon === 'zap' && <Zap className="w-5 h-5 text-[#2563eb]" />}
                        {highlight.icon === 'package' && <Package className="w-5 h-5 text-[#2563eb]" />}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#f5f5f7]">{highlight.title}</p>
                        <p className="text-xs text-[#71717a]">{highlight.value}</p>
                      </div>
                    </div>
                  )) || product.features?.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-[#2563eb]" />
                      <span className="text-sm text-[#a1a1aa]">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex gap-4">
                  <button className="btn-primary flex-1">
                    Add to Cart
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="btn-secondary">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="bg-[#141416] border-y border-[#27272a] sticky top-20 z-40">
          <div className="container-wide">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 text-sm font-medium tracking-wide uppercase border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'text-[#f5f5f7] border-[#2563eb]'
                      : 'text-[#71717a] border-transparent hover:text-[#a1a1aa]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Content */}
        <section className="section-spacing bg-[#0a0a0b]">
          <div className="container-wide">
            {activeTab === 'overview' && (
              <div className="max-w-4xl">
                <h2 className="heading-section text-[#f5f5f7] mb-6">
                  {product.headline || 'PRODUCT OVERVIEW'}
                </h2>
                <p className="text-body text-lg mb-12">
                  {product.description}
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {product.aboutItems?.map((item, index) => (
                    <div key={index} className="p-6 bg-[#141416] border border-[#27272a]">
                      <h3 className="text-lg font-semibold text-[#f5f5f7] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#a1a1aa]">
                        {item.description}
                      </p>
                    </div>
                  )) || product.features?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 p-6 bg-[#141416] border border-[#27272a]">
                      <Check className="w-5 h-5 text-[#2563eb] mt-0.5" />
                      <span className="text-[#a1a1aa]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-4xl">
                <h2 className="heading-section text-[#f5f5f7] mb-8">
                  TECHNICAL SPECIFICATIONS
                </h2>
                <div className="space-y-0">
                  {product.specs?.map((spec, index) => (
                    <div 
                      key={index} 
                      className={`flex justify-between py-4 border-b border-[#27272a] ${
                        index === 0 ? 'border-t' : ''
                      }`}
                    >
                      <span className="text-[#71717a]">{spec.label}</span>
                      <span className="text-[#f5f5f7] font-medium text-right">{spec.value}</span>
                    </div>
                  )) || (
                    <>
                      <div className="flex justify-between py-4 border-t border-b border-[#27272a]">
                        <span className="text-[#71717a]">Connectivity</span>
                        <span className="text-[#f5f5f7] font-medium">Bluetooth 5.3</span>
                      </div>
                      <div className="flex justify-between py-4 border-b border-[#27272a]">
                        <span className="text-[#71717a]">Waterproof Rating</span>
                        <span className="text-[#f5f5f7] font-medium">IP67</span>
                      </div>
                      <div className="flex justify-between py-4 border-b border-[#27272a]">
                        <span className="text-[#71717a]">Battery Life</span>
                        <span className="text-[#f5f5f7] font-medium">16+ Hours</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'included' && (
              <div className="max-w-4xl">
                <h2 className="heading-section text-[#f5f5f7] mb-8">
                  WHAT'S IN THE BOX
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {product.inBox?.map((item, index) => (
                    <div key={index} className="p-6 bg-[#141416] border border-[#27272a] text-center">
                      <Package className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
                      <p className="text-sm text-[#f5f5f7]">{item}</p>
                    </div>
                  )) || (
                    <>
                      <div className="p-6 bg-[#141416] border border-[#27272a] text-center">
                        <Package className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
                        <p className="text-sm text-[#f5f5f7]">Main Unit</p>
                      </div>
                      <div className="p-6 bg-[#141416] border border-[#27272a] text-center">
                        <Package className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
                        <p className="text-sm text-[#f5f5f7]">Mounting Kit</p>
                      </div>
                      <div className="p-6 bg-[#141416] border border-[#27272a] text-center">
                        <Package className="w-8 h-8 text-[#2563eb] mx-auto mb-3" />
                        <p className="text-sm text-[#f5f5f7]">Charging Cable</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Related Products */}
        <section className="bg-[#141416] border-t border-[#27272a]">
          <div className="container-wide py-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="heading-subsection text-[#f5f5f7]">
                EXPLORE MORE
              </h2>
              <Link to="/products" className="text-sm text-[#2563eb] hover:text-[#3b82f6] flex items-center gap-1">
                View All Products
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
