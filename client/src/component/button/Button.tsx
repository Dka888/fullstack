import { FC } from 'react';
import './Button.scss';

interface ButtonProps {
    name: String,
    action: () => void,
}
export const Button:FC<ButtonProps> = ({ name, action }) => {
    const handleSubmit = () => {
        action();
    }

    return (
        <button className="button" onClick={handleSubmit}>{name} </button>
    )
}