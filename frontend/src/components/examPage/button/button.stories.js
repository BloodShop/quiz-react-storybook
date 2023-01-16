import React from "react";
import Button from "./button";

export default {
    title: 'form/Button',
    component: Button,
    args: {
        children: 'Button'
    }
}

export const Primary = ({ children, ...rest }) => <Button variant='primary' { ...rest }>{children}</Button>
export const Secondary = ({ children, ...rest }) => <Button variant='secondary' { ...rest }>{children}</Button>
export const Success = ({ children, ...rest }) => <Button variant='success' { ...rest }>{children}</Button>
export const Danger = ({ children, ...rest }) => <Button variant='danger' { ...rest }>{children}</Button>

/* Args */
const Template = args => <Button {...args} />

export const PrimaryA = Template.bind({});
PrimaryA.args = {
    variant: 'primary',
    children: 'Primary Args'
}

export const LongPrimaryA = Template.bind({});
LongPrimaryA.args = {
    ...PrimaryA.args,
    // children: 'Long Primary Args'
}

export const SecondaryA = Template.bind({});
SecondaryA.args = {
    variant: 'secondary',
    // children: 'Secondary Args'
}