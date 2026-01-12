import React, { useState, useEffect } from 'react';
import { Check, ChevronRight, Loader2 } from 'lucide-react';
import { getProducts } from '../../services/api';
import { products as mockProducts } from '../../data/mock';

const ProductSimulator = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        if (data && data.length > 0) {
          setProducts(data);
          setSelectedProduct(data[1] || data[0]);
        } else {
          setSelectedProduct(mockProducts[1]);
        }
      } catch (error) {
        console.log('Using mock products');
        setSelectedProduct(mockProducts[1]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section id="products" className="section-spacing bg-[#141416]">
        <div className="container-wide flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[#2563eb] animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="section-spacing bg-[#141416]">
      <div className="container-wide">
        {/* Section Header */}
        <div className="mb-16">
          <span className="text-label text-[#2563eb] mb-4 block">Select Your Loadout</span>
          <h2 className="heading-section text-[#f5f5f7]">
            PRODUCT SELECTION
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className={`text-left p-8 border transition-all duration-150 ${
                selectedProduct?.id === product.id
                  ? 'bg-[#1a1a1e] border-[#2563eb]'
                  : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'
              }`}
            >
              {/* Product Badge */}
              {selectedProduct?.id === product.id && (
                <span className="inline-block text-xs font-medium tracking-wider uppercase text-[#2563eb] mb-4">
                  Selected
                </span>
              )}

              {/* Product Name */}
              <h3 className="heading-subsection text-[#f5f5f7] mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-[#71717a] mb-4">
                {product.tagline}
              </p>

              {/* Price */}
              <p className="text-2xl font-bold text-[#f5f5f7] mb-6">
                {product.price}
              </p>

              {/* Features */}
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-[#a1a1aa]">
                    <Check className="w-4 h-4 text-[#2563eb]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        {/* Selected Product CTA */}
        {selectedProduct && (
          <div className="mt-12 p-8 bg-[#0a0a0b] border border-[#27272a]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-sm text-[#71717a] mb-1">Your Selection</p>
                <h4 className="text-xl font-bold text-[#f5f5f7]">
                  {selectedProduct.name} — {selectedProduct.price}
                </h4>
              </div>
              <button className="btn-primary">
                Configure & Order
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSimulator;
