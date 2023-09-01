import React from 'react';
import './Basket.scss';
import { Button } from '../button/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeAllFromBasket } from '../../features/basketSlice';
import { useSearchContext } from '../../utils/Context';
import { Loader } from '../loader/Loader';



export const Baskets = () => {

    const dispatch = useAppDispatch();
    const { isLoadingBasket } = useAppSelector(state => state.basket);

    const {handleAddQuantity, handleMinusQuantity, listOfProduct} = useSearchContext();
    let suma = 0;

    if (listOfProduct.length) {
        suma = Math.round(listOfProduct.reduce((acc, curr) => acc + curr.price * curr.quantity, 0) * 100) / 100;
    }

    const handleDeleteAll = () => {
        dispatch(removeAllFromBasket());
        window.location.href = '/user';
    };

    const isProducts = listOfProduct.length > 0;

    return (
        <div className="basket">
            <h2 className='basket__title'>Basket</h2>
            <div className='basket__container'>
                <section className="basket__product-list">
                    {isLoadingBasket
                        ? <Loader />
                        : isProducts
                            ? listOfProduct.map(product =>
                                <React.Fragment key={product._id} >
                                
                                    <div className="basket__product">
                                        <img src={product.imgUrl} alt={product.name} />
                                        <div>
                                            <h2>{product.name}</h2>
                                            <p>Price: {product.price}</p>
                                        </div>


                                    </div>
                                    <div className='basket__addition'>
                                        <div>
                                            <div>Quantity: {product.quantity}</div>
                                        </div>
                                        <div className='basket__addition-buttons'>
                                        <div><Button name="+" action={() => handleAddQuantity(product)} /></div>
                                        <div><Button name='-' action={() => handleMinusQuantity(product)} /></div>
                                        </div>
                                    </div>
                                    <hr style={{ width: '70%', margin: 0 }}></hr>
                                </React.Fragment>)
                            : <div style={{ margin: 'auto' }}>Nothing in the basket!</div>
                    }
                </section>

                {isProducts &&
                    <section className="basket__cart">
                        <p className="basket__total">Suma: ${suma}</p>
                        <Button name='going to payment' action={handleDeleteAll} />
                    </section>}
            </div>
        </div>
    )
}