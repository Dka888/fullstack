import {Link} from 'react-router-dom';
import './Category.scss';

export const Categories = () => {
    const categories = [
        {name: 'technology', urlImg: './images/technologies.jpg', id: 1}, 
        {name: 'garden', urlImg: './images/gardening.jpg', id: 2}, 
        { name:'furniture', urlImg: './images/furnitures.jpg', id: 3}, 
        {name:'sport', urlImg: './images/sport (2).jpg', id: 4}, 
        {name:'food', urlImg: './images/food.jpg', id: 5}, 
        {name:'clothes', urlImg: './images/clothes.jpg', id: 6}, 
        {name:'home', urlImg: './images/home-decor.jpg', id: 7}, 
        {name: 'health', urlImg: './images/health.jpg', id: 8}
    ];

    return (
        <section>
            <h2 className='categories__title'>Categories</h2>
            <div className="categories">
                {categories.map(category => 
                <div className="category" key={category.id} >
                    <Link to={category.name} className='categories__link'>
                        <img src={category.urlImg} alt={category.name} className='category__img'/>
                        <h4>{category.name}</h4>            
                    </Link>
                </div>)}
            </div>
        </section>

    )
}