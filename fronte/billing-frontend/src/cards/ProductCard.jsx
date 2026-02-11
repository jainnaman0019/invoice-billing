const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <li className="border rounded-lg p-3 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-500">
          ₹{product.price} · Qty {product.quantity}
        </p>
      </div>

      <span className="text-xs bg-gray-200 px-2 py-1 rounded">
        {product.category}
      </span>
    </li>
  );
};

export default ProductCard;
