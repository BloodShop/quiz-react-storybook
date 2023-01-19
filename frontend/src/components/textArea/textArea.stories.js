import React from "react";
import TextArea from "./textArea";

export default {
    title: 'form/TextArea',
    component: TextArea,
    args: {
        children: 'TextArea'
    }
}

export const TextAreaDefault = ({ children, ...rest }) => <TextArea { ...rest }>{children}</TextArea>
