import React from 'react';
import './textArea.css';

export default function TextArea(props) {
    const { variant = 'default', children, ...rest } = props;
    return (
        <textarea className={`textarea ${variant}`} {...rest}>
            {children}
        </textarea>
    );
}