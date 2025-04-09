import React from 'react'
import { Controller, FieldValues, Path, Control } from 'react-hook-form'
import { FormItem, FormLabel, FormControl, FormDescription, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { string } from 'zod';

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file'
}

const formField = <T extends FieldValues>({ control, name, label, placeholder, type ="text" } : FormFieldProps<T>) => (
<Controller 
    control={control} 
    name={name} 
    render={({field}) => (
            <FormItem>
                <FormLabel className="label">{label}</FormLabel>
                <FormControl>
                    <Input 
                        className="input"
                        placeholder={placeholder}
                        type={type}
                        {...field} 
                    />
                </FormControl>
                
                <FormMessage />
                </FormItem>
    
  )}                  
  
  />
       
);       
     


export default formField