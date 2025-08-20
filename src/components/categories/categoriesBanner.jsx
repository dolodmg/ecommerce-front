import CategoryCard from "./categoryCard";

export default function CategoriesBanner() {
    return (
        <div className="flex flex-wrap justify-center gap-30 p-4">
            <CategoryCard
                name="Álbumes"
                imageUrl="/images/categories/album.png"
                link="/albums"
            />
            <CategoryCard
                name="Libros"
                imageUrl="/images/categories/libro.png"
                link="/books"
            />
            <CategoryCard
                name="Juegos de mesa"
                imageUrl="/images/categories/boardgame.png"
                link="/boardgames"
            />
        </div>
    );
}