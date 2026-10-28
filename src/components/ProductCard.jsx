import React, { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product, index, onEnquire }) {
  const [imgError, setImgError] = useState(false);

  return (
    <article
      className="product-card"
      style={{ animationDelay: `${index * 0.15}s` }}
      aria-label={`Product: ${product.name}`}
    >
      {/* Image Area */}
      <div className="product-card__image-wrap">
        {!imgError ? (
          <img
            src={product.imagePath}
            alt={product.imageAlt}
            className="product-card__image"
            loading="lazy"
            onError={(e) => {
              if (product.localImagePath && e.target.src !== window.location.origin + product.localImagePath && !e.target.dataset.triedLocal) {
                e.target.dataset.triedLocal = 'true';
                e.target.src = product.localImagePath;
              } else {
                setImgError(true);
              }
            }}
          />
        ) : (
          <div className="product-card__image-placeholder">
            <div className="product-card__placeholder-icon">🚜</div>
            <p className="product-card__placeholder-text">
              Product photo coming soon
            </p>
            <code className="product-card__placeholder-path">{product.imagePath}</code>
          </div>
        )}

        {/* Hover overlay */}
        <div className="product-card__overlay">
          <button
            type="button"
            className="btn btn-accent product-card__enquire-hover"
            onClick={() => onEnquire && onEnquire(product)}
          >
            Enquire Now
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>
        <button
          type="button"
          className="btn btn-primary product-card__cta"
          onClick={() => onEnquire && onEnquire(product)}
        >
          Enquire Now →
        </button>
      </div>
    </article>
  );
}
