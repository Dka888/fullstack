import { Price, Rating } from '../../utils/Sort';
import './Sort.scss';

interface SortProps {
    price: Price,
    rating: Rating,
    handleSortPrices: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSortRating: (event: React.ChangeEvent<HTMLSelectElement>) => void 
}

export const Sort = ({price, rating, handleSortPrices, handleSortRating}: SortProps) => {

    return (
        <div className='sort'>
            <select name='sortPrice' value={price || 'Prices'} onChange={handleSortPrices}>
                <option value={Price.Price}>Price</option>
                <option value={Price.PriceUp}>Price up</option>
                <option value={Price.PriceDown}>Price down</option>
            </select>
            <select name='sortRatings' value={rating || 'Ratings'} onChange={handleSortRating}>
                <option value={Rating.Rating}>Rating</option>
                <option value={Rating.RatingUp}>Rating up</option>
                <option value={Rating.RatingDown}>Rating down</option>
            </select>
        </div>
    )
}