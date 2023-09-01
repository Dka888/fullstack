import { Product } from '../../utils/Product';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../store/hooks';
import { editProduct } from '../../features/productsSlice';
import './Card.scss';
import { useSearchContext } from '../../utils/Context';

interface CardProps {
    product: Product;
}

export const Card = ({product}: CardProps) => {
    const {name, price } = product;
    const dispatch = useAppDispatch();

    const handleClickStars = (number: number) => {
        let updatedProduct: Product;
        if(product.click > 0) {
            const newClick = product.click + 1;
            const newRating = Math.round((product.rating * product.click + number) / (newClick) * 10) / 10;
            
            updatedProduct= {...product, click: newClick, rating: newRating}
        } else {
            const newClick = product.click + 1;
            updatedProduct = {...product, click: newClick, rating: number}
        }

        dispatch(editProduct(updatedProduct));
    }

    const { handletoAdd} = useSearchContext();

    const productCode = product._id.slice(10);

    return (

        <div className="card">
            <Link to={`/cartInfo/${product._id}`} className='card__link'>
            <img
                src={product.imgUrl}
                alt={product.name}
                className="card_apple"
            ></img>

                <h2 className="card_descript">{name}</h2>
                
                <div className="card_code">Product code: {productCode}</div>
            </Link> 
                <div className="card_rew">
                    <div className={`stars stars--${Math.round(product.rating)}`}>
                        <div className="stars__star" onClick={() => handleClickStars(1)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(2)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(3)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(4)}></div>
                        <div className="stars__star" onClick={() => handleClickStars(5)}></div>
                    </div>
                    <div className="review">
                        Rating: {product.rating}
                    </div>
                </div>

                <div className="card_price">
                    <div className="price">Price</div>
                    <div className="price_value">{price}</div>
                </div>

                <button
                    onClick={() => handletoAdd(product)}
                    className="card_buy"
                >
                    Buy
                </button>
        </div>

    )
}