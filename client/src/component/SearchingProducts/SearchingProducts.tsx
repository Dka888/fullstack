import { useEffect, useMemo, useState } from 'react';
import { Card } from '../../component/Card/Card';
import { Pagination } from '../../component/Pagination/Pagination';
import { SearchBar } from '../../component/searchingBar/SearchBar';
import { Product } from '../../utils/Product';
import { useParams } from 'react-router-dom';
import './SearchProducts.scss';
import { usePaginationHook } from '../../utils/PaginationHook';
import { useSearchContext } from '../../utils/Context';
import { Sort } from '../soringComponent/Sort';
import { Price, Rating } from '../../utils/Sort';


export const SearchingProducts = () => {
    const [searchProducts, setSearchProducts] = useState<Product[]>([]);
    const { search, products, price, rating, handleSortPrices, handleSortRating } = useSearchContext();
    const { query } = useParams();

    useEffect(() => {
        if (products.length && query) {
            const newProduct = products.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
            setSearchProducts(newProduct);
        }
    }, [products, query]);

    const forPages = searchProducts.length || 1;
    const { firstItem, lastItem, pages, currPage, setCurrPage } = usePaginationHook(forPages);

    const searchProduct = useMemo(() => {
        let tempProducts = searchProducts;
        if (search) {
            tempProducts = tempProducts.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        if (rating !== Rating.Rating) {
            switch (rating) {
                case Rating.RatingUp: tempProducts.sort((a, b) => a.rating - b.rating);
                    break;
                case Rating.RatingDown: tempProducts.sort((a, b) => b.rating - a.rating);
                    break;
                default: return tempProducts;
            }
        }

        if (price !== Price.Price) {
            switch (price) {
                case Price.PriceUp: tempProducts.sort((a, b) => a.price - b.price);
                    break;
                case Price.PriceDown: tempProducts.sort((a, b) => b.price - a.price);
                    break;
                default: return tempProducts;
            }
        }

        tempProducts = tempProducts.slice(firstItem, lastItem);

        return tempProducts;
    }, [searchProducts, search, rating, price, firstItem, lastItem]);


    return (
        <section className="productList">
            <SearchBar />
            <h2 className="productList__title">{search || query}</h2>
            <Sort price={price} rating={rating} handleSortPrices={handleSortPrices} handleSortRating={handleSortRating} />
            <div className="productList__container">
                {!!searchProduct.length
                    ? searchProduct.map(product => <Card product={product} key={product._id} />)
                    : <div>No products</div>}
            </div>
            <Pagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
        </section>
    )
}