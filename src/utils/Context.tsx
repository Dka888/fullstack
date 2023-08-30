import { ReactNode, createContext,  useCallback,  useContext, useEffect, useState } from "react";
import { getProducts } from "../features/productsSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Product } from "./Product";
import { User } from "./User";
import { Price, Rating } from "./Sort";
import { addToBasket, changeQuantities, deleteItem, getBasket } from "../features/basketSlice";
import { ProductsInBasket } from "./Basket";
import { status } from './Basket';

interface historyProduct extends Product {
    quantity: number,
}

interface SearchContextInterface {
    search: string,
    handleQuery: (search: string) => void,
    products: Product[],
    price: Price,
    rating: Rating,
    handleSortPrices: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    handleSortRating: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    user: User | null,
    avatar: string,
    listOfProduct: ProductsInBasket[],
    handleAddQuantity: (product: ProductsInBasket) => void,
    handleMinusQuantity: (product: ProductsInBasket) => void,
    handletoAdd: (product: Product) => void,
    history: historyProduct[],
}
export const SearchContext = createContext<SearchContextInterface>({
    search: '',
    handleQuery: () => { },
    products: [],
    price: Price.Price,
    rating: Rating.Rating,
    handleSortPrices: () => {},
    handleSortRating: () => { },
    user: null,
    avatar: '',
    listOfProduct: [],
    handleAddQuantity: () => { },
    handleMinusQuantity: () => { },
    handletoAdd: () => { },
    history: [],
})

export const SearchContextProvider = (
    {children}: {children: ReactNode},
) => {
    const [search, setSearch] = useState('');
    const [price, setPrice] = useState(Price.Price);
    const [rating, setRating] = useState(Rating.Rating);
    const [user, setUser] = useState<User | null>(null);

    const dispatch = useAppDispatch();
    const [avatar, setAvatar] = useState('');

    const [listOfProduct, setListOfProduct] = useState<ProductsInBasket[]>([]);
    const [history, setHistory] = useState<historyProduct[]>([]);

     const basketItems = useAppSelector((state) => state.basket.items); 
 
     useEffect(() => {
         if (basketItems.length) {
             const filteredItems = basketItems.filter(item => item.status === status.in_Cart);
             const listOfItems = filteredItems.map(item => {
                 const { productId, quantity, status, _id } = item;
                 const fullProduct = { ...productId, quantity, status, _id };
                 
                 return fullProduct;
             });
 
             setListOfProduct(listOfItems);
         }
     }, [basketItems, dispatch]);

     useEffect(() => {
        if (basketItems.length) {
            const filteredItems = basketItems.filter(item => item.status === status.purchased);
            const listOfItems = filteredItems.map(item => {
                const { productId, quantity } = item;
                const fullProduct = { ...productId, quantity};
                
                return fullProduct;
            });
            setHistory(listOfItems);
        }
    }, [basketItems]);

     const handleAddQuantity = (product: ProductsInBasket) => {
        const { quantity } = product;
        const newQuantity = quantity + 1;
        const newProduct = { ...product, quantity: newQuantity }
        dispatch(changeQuantities(newProduct));

        const replace = listOfProduct.map(item => item._id === newProduct._id ? newProduct : item);
        setListOfProduct(replace);
    }

    const handleMinusQuantity = (product: ProductsInBasket) => {
      
        const  { quantity } = product;
        const newQuantity = quantity - 1;
        const newProduct = { ...product, quantity: newQuantity }
        if (newQuantity === 0) {
            console.log(product);
            dispatch(deleteItem(product._id));
            const replace = listOfProduct.filter(item => item._id !== newProduct._id);
            setListOfProduct(replace);
        } else {
           
            dispatch(changeQuantities(newProduct));
            
            const replace = listOfProduct.map(item => item._id === newProduct._id ? newProduct : item);
            setListOfProduct(replace);
        }
    }

    const avatars = ['./img/catgamer.jpg', './img/smokingMafia.jpg', './img/frogg.jpg', './img/chess.jpg', './img/nerd.jpg', './img/monster.jpg'];
    
    useEffect(() => {
       setAvatar(avatars[Math.round(Math.random() * (avatars.length - 1))]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
        const loadingProducts = async () => {
            await dispatch(getProducts());
        }
        loadingProducts();
    }, [dispatch]);

    const products = useAppSelector(state => state.products.products);

    // useEffect(() => {
    //     const loadingUsers = async() => {
    //         await dispatch(getUser());
    //     }
    //     loadingUsers();
        
    // },[dispatch]);

    useEffect(() => {
        const loggedInUserJSON = localStorage.getItem('loggedInUser');
        const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;
        setUser(loggedInUser);
        }, []);

    useEffect(() => {
        if(user !== null) {
            dispatch(getBasket(user._id));
        }
    }, [dispatch, user])

    const handleQuery = (query: string) => {
        setSearch(query)
    };

    const handleSortPrices = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const choose = event.target.value;
        switch (choose) {
            case Price.PriceUp: setPrice(Price.PriceUp);
                break;
            case Price.PriceDown: setPrice(Price.PriceDown);
                break;
            default: setPrice(Price.Price);
                break;
        }
    }, []);

    const handleSortRating = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        const choose = event.target.value;
        switch (choose) {
            case Rating.RatingUp: setRating(Rating.RatingUp);
                break;
            case Rating.RatingDown: setRating(Rating.RatingDown);
                break;
            default: setRating(Rating.Rating);
                break;
        }
    }, []);

    const handletoAdd = useCallback((product: Product) => {
        const loggedInUserJSON = localStorage.getItem('loggedInUser');
        const loggedInUser = loggedInUserJSON ? JSON.parse(loggedInUserJSON) : null;

        if (!loggedInUser) {
            return;
        }
        const newProductInBasket = {...product, quantity: 1, status: status.in_Cart};

        const foundProductInCart = listOfProduct.find(item => item.name === newProductInBasket.name);
        if(!foundProductInCart) {
            setListOfProduct(prevState => [...prevState, newProductInBasket]); 
        } 
        dispatch(addToBasket(product));
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <SearchContext.Provider value={{
            search,
            handletoAdd,
            handleQuery,
            products,
            price, 
            rating,
            handleSortPrices,
            user,
            handleSortRating, 
            avatar,
            listOfProduct,
            handleAddQuantity,
            handleMinusQuantity,
            history,
        }}>{children}</SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);