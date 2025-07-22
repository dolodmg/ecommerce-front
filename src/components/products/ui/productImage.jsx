import React from "react";

export default function ProductImage({ product }) {
    return (
        <img
            className="w-90 h-90 object-cover"
            src={"/images/tayalbum.png"}
            alt={product.name}
          />
    );
}