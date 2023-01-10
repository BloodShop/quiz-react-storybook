import React from 'react';
import Input from './input';

export default {
  title: 'form/Input',
  component: Input,
}

export const Small = ({ ...rest }) => <Input size='small' {...rest}/>
export const Medium = ({ ...rest }) => <Input size='medium'  {...rest}/>
export const Large = ({ ...rest }) => <Input size='large'  {...rest}/>
export const RadioInput = ({ ...rest }) => <Input size='small' type='radio' {...rest}/>

Small.storyName = 'Small Input'