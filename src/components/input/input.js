import React from 'react';
import './input.css';

export default function Input (props) {
    const { size = 'medium', ...rest } = props
    return (
        <input className={`input ${size}`} {...rest} />
    )
}
