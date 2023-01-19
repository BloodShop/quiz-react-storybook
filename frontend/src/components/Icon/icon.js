import React from 'react';
import './icon.css';

export default function Icon(props) {
    const { variant = 'default', children, ...rest } = props;
    return (
        <button className={`icon ${variant}`} {...rest}>
            {children}
        </button>
    );
}