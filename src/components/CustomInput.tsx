import {
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from 'react-hook-form';

interface CustomInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  placeholder: string;
  label: string;
  required?: boolean; 
  disabled?: boolean; 
}

const CustomInput = <T extends FieldValues>({ control, name, label, placeholder, required = false, disabled = false }: CustomInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className='form-item'>
          <FormLabel>{label}</FormLabel>
          <div className="flex w-full flex-col">
            <FormControl>
              <Input
                placeholder={placeholder}
                disabled={disabled}
                required={required}
                type={name === 'password' ? 'password' : 'text'}
                className='text-16 placeholder:text-16 rounded-lg border border-text/20 text-text focus:ring-primary active:ring-primary placeholder:text-text/60'
                {...field}
              />
            </FormControl>
            <FormMessage className='form-message mt-2' />
          </div>
        </div>
      )}
    />
  );
};

export default CustomInput;
