import React, { useState } from 'react';
import { Category } from '../../utils/Categoris';
import './addProduct.scss';
import axios from 'axios';
import { Product } from '../../utils/Product';

type FormData = Omit<Product, '_id'>;

export const AddProduct = () => {
    const [formData, setFormData] = useState<FormData>({
        imgUrl: '',
        name: '',
        category: Category.Technology,
        price: 0,
        rating: 0,
        description: '',
        click: 0,
    });

    const [wait, setWait] = useState(false);

    const [message, setMessage] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setWait(true);
        try {
            const response = await axios.post('http://localhost:3333/products/add', formData); 
        
            if (response.status === 201) {
                setMessage(true);
                setTimeout(() => setMessage(false), 3000);
                reset();
                setWait(false);
            } else {
                console.log(response);
            }
        } catch (e) {
            console.log(e);
        }
    }

    function reset() {
        setFormData(prevData => ({
            ...prevData,
            name: '',
            description: '',
            price: 0,
            imgUrl: '',
        }));

    }

    return (
        <div className="addProductForm">
            <div 
                className={wait ? 'show' : 'hidden'} 
                style={{ margin: '0 auto', color: 'darkgreen', fontSize: '1.2rem', textAlign: 'center' }}
            >We adding your product to the base. Please wait!</div>
            <form className="addProductForm__form" onSubmit={handleSubmit}>
                <div className="addProductForm__form__field">
                    <label className="addProductForm__form__field-label" htmlFor="name">Name of product:</label>
                    <input
                        className="addProductForm__form__field-input"
                        type="text"
                        id="name"
                        value={formData.name}
                        name="name"
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductForm__form__field">
                    <label className="addProductForm__form__field-label" htmlFor="desc">Description:</label>
                    <textarea
                        className="addProductForm__form__field-textarea"
                        id="desc"
                        name="description"
                        rows={4}
                        value={formData.description}
                        required
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="addProductForm__form__field">
                    <label className="addProductForm__form__field-label" htmlFor="price">Price:</label>
                    <input
                        className="addProductForm__form__field-input"
                        type="number" 
                        step="0.01"
                        id="price"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductForm__form__field">
                    <label className="addProductForm__form__field-label" htmlFor="category">Category:</label><br />
                    <select id="category" name="category" value={formData.category} required onChange={handleChange}>
                        <option value={Category.Technology}>{Category.Technology}</option>
                        <option value={Category.Clothes}>{Category.Clothes}</option>
                        <option value={Category.Food}>{Category.Food}</option>
                        <option value={Category.Furniture}>{Category.Furniture}</option>
                        <option value={Category.Garden}>{Category.Garden}</option>
                        <option value={Category.Health}>{Category.Health}</option>
                        <option value={Category.Home}>{Category.Home}</option>
                        <option value={Category.Sport}>{Category.Sport}</option>
                    </select>
                </div>
                <div className="addProductForm__form__field">
                    <label className="addProductForm__form__field-label" htmlFor="imgUrl">URL image:</label>
                    <input
                        className="addProductForm__form__field-input"
                        type="url"
                        id="imgUrl"
                        name="imgUrl"
                        required
                        value={formData.imgUrl}
                        onChange={handleChange}
                    />
                </div>
                <button className="addProductForm__submit">Add Product</button>
            </form>
            <div className={message ? 'show' : 'hidden'} style={{ margin: '0 auto 2rem', color: 'green', fontSize: '1.5rem', textAlign: 'center' }}>Your successful add the product!</div>
        </div>
    );
};



