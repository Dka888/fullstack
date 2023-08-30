import React from "react";
import { useSearchContext } from "../../utils/Context"

import './UserHistory.scss'


export const UserHistory = () => {
    const { history } = useSearchContext();
    return (
        <div className="history">
            <div className='history__container'>
                <section className="history__product-list">
                    {!!history.length ?
                        <table>
                            <tr>
                                <th>img</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                            {history.map(product =>
                               <tr key={product._id}>
                                <td className="history__img">
                                    <img 
                                    src={`${product.imgUrl}`} 
                                    alt={`${product.name}`}
                                    />
                                </td>
                                <td>{product.name}</td>    
                                <td>{product.price}$</td>
                                <td>{product.quantity}</td>
                               </tr> )}
                        </table>
                        : <div style={{ margin: 'auto' }}>Your history is empty</div>}

                </section>
            </div>
        </div>
    )
}