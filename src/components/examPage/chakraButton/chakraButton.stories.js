import React from "react";
import { Button } from "@chakra-ui/react";
import { actions, action } from '@storybook/addon-actions';
import { text, boolean } from "@storybook/addon-controls";

export default {
    title: 'ChakraButton',
    component: Button,
    argTypes: {
        colorScheme: { control: 'text' },
        children: { control: 'text' },
        onClick: { action: 'clicked' }
    }
}

const Template = args => <Button {...args} />

export const Success = Template.bind({});
Success.args = {
    colorScheme: 'green',
    children: 'Success',
    ...actions('onClick', 'onMouseOver')

}

export const Danger = Template.bind({});
Danger.args = {
    colorScheme: 'red',
    children: 'Danger',
    onMouseOver: action('MouseOverEvent')
}

export const Log = () => (
    <Button colorScheme={'blue'} onClick={() => console.log('Button clicked', process.env.STORYBOOK_THEME)}>
        Log
    </Button>
)

export const Knobs = () => (
    <Button colorScheme={'purple'} disabled={boolean('Disabled', false)}>
        {text('Label', 'Button Label')}
    </Button>
)