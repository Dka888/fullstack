import { SearchBar } from "../../component/searchingBar/SearchBar";
import { Slider } from "../../component/slider/Slider";
import { Card } from "../../component/Card/Card";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from '../../features/productsSlice';
import {categories} from '../../utils/Categoris';
import { Loader } from "../../component/loader/Loader";
import './Home.scss';
import { Product } from "../../utils/Product";



export const Home = () => {
    const [productsForCarousel, setCarousel] = useState<Product[]>([]);
    const dispatch = useAppDispatch();
    const products = useAppSelector(state => state.products.products);
    

    useEffect(() => {
        const loadingProducts = async () => {
            await dispatch(getProducts());
            if (products.length) {
                setCarousel(products.slice(products.length - 5));  
            }       
        }
        loadingProducts();
        
    }, [dispatch, products]);

    return (
        <main>
            <SearchBar />
            <div className="container">
                <h2 className="container__title">Popular categories</h2>
                <Slider categories={categories} />
                <div className="carousel">
                    <h2>New Products</h2>
                    <div className="carousel__view">
                        {productsForCarousel.length
                            ? productsForCarousel.map(product =>
                            <Card product={product} key={product._id}/>
                            )
                            : <div><Loader /></div>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}