

export const ProductImage = ({ product, className }) => {
    return (
        <img 
            className={className}
            src={"/images/tayalbum.png"}
            alt={product.name}
            />
    );
}