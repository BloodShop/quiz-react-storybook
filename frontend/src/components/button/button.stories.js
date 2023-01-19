import React from "react";
import Button from "./button";

export default {
    title: 'form/Button',
    component: Button,
    args: {
        children: 'Button'
    }
}

export const PrimaryBtn = ({ children, ...rest }) => <Button variant='primary' { ...rest }>{children}</Button>
export const SecondaryBtn = ({ children, ...rest }) => <Button variant='secondary' { ...rest }>{children}</Button>
export const Success = ({ children, ...rest }) => <Button variant='success' { ...rest }>{children}</Button>
export const DangerBtn = ({ children, ...rest }) => <Button variant='danger' { ...rest }>{children}</Button>
export const CloseBtn = ({ children, ...rest }) => <Button variant='close' { ...rest }>{children}</Button>
export const EditBtn = ({ children, ...rest }) => <Button variant='edit' { ...rest }>{children}</Button>

/* Args */
const Template = args => <Button {...args} />

export const PrimaryBtnA = Template.bind({});
PrimaryBtnA.args = {
    variant: 'primary',
    children: 'PrimaryBtn Args'
}

export const LongPrimaryBtnA = Template.bind({});
LongPrimaryBtnA.args = {
    ...PrimaryBtnA.args,
    // children: 'Long PrimaryBtn Args'
}

export const SecondaryBtnA = Template.bind({});
SecondaryBtnA.args = {
    variant: 'secondary',
    // children: 'SecondaryBtn Args'
}