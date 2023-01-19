import React from "react";
import Icon from "./icon";

export default {
    title: 'form/Icon',
    component: Icon,
    args: {
        children: 'Icon'
    }
}

export const DeleteIcon = ({ children, ...rest }) => <Icon variant='delete' { ...rest }>{children}</Icon>
export const EditIcon = ({ children, ...rest }) => <Icon variant='edit' { ...rest }>{children}</Icon>
export const AddIcon = ({ children, ...rest }) => <Icon variant='add' { ...rest }>⇧</Icon>
export const SubIcon = ({ children, ...rest }) => <Icon variant='substract' { ...rest }>⇩</Icon>
export const ResetIcon = ({ children, ...rest }) => <Icon variant='reset' { ...rest }>↺</Icon>
