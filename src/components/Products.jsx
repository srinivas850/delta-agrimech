import React, { useState } from 'react';
import { PRODUCTS } from '../data/siteData';
import ProductCard from './ProductCard';
import ProductEnquiryModal from './ProductEnquiryModal';
import './Products.css';

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <section id="products" className="section products">
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <span className="products__badge">Our Machines</span>
          <h2 className="section-title">Premium Product Lineup</h2>
          <div className="section-header-bar" />
          <p className="section-subtitle">
            Engineered for India's diverse farming conditions — powerful, reliable,
            and built to deliver season after season.
          </p>
        </div>

        {/* Product grid */}
        <div className="products__grid">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onEnquire={(prod) => setSelectedProduct(prod)}
            />
          ))}
        </div>
      </div>

      {/* Product Enquiry Modal */}
      {selectedProduct && (
        <ProductEnquiryModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}
