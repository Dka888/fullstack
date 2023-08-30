import { Product } from '../../utils/Product';
import { useParams } from 'react-router-dom';
import './CartItem.scss';
import { useEffect, useState } from 'react';
import { Button } from '../../component/button/Button';
import { addToBasket } from '../../features/basketSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export const CartItem = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product>();
    const products = useAppSelector(state => state.products.products);
    
    useEffect(() => {
        const takeProduct = products.find(product => product._id === id);
        if (takeProduct) {
            setProduct(takeProduct);
        }
    }, [id, products]);
    
    const dispatch = useAppDispatch();

    const handletoAdd = () => {
       if(product) dispatch(addToBasket(product));
    }

    return (
        <div className="cartItem">
            <h2 className="cartItem__title">Product Info</h2>
            <div className='cartItem__container'>
                <div className='cartItem__container-img'>
                    <h4 className='cartItem__container-title'>{product?.name}</h4>
                    <img src={product?.imgUrl} alt={product?.name} />
                </div>
                <div className='cartItem__container-info'>
                    <p className='cartItem__container-info--text'><span>Product:</span> {product?.name}</p>
                    <p className='cartItem__container-info--text'><span>Category:</span> {product?.category}</p>
                    <p className='cartItem__container-info--text'><span>Price:</span> {product?.price}</p>
                    <p className='cartItem__container-info--text'><span>Rating: </span>{product?.rating}</p>
                    <div style={{textAlign:'center', marginTop: '5rem'}}>
                        <Button action={handletoAdd} name="Add to Basket" />
                    </div>
                </div>
            </div>
            <div className='cartItem__desc'>
                <h5>Product description</h5>
                <p>{product?.description}</p>
            </div>
        </div>
    )
}

