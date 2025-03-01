import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  children: React.ReactNode;
  className?: string;
  defaultValues?: z.infer<T>;
}

function Form<T extends z.ZodType>({ 
  schema, 
  onSubmit, 
  children, 
  defaultValues, 
  className = '' 
}: FormProps<T>) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as z.infer<T>,
  });

  return (
    <FormProvider {...methods}>
      <form 
        onSubmit={methods.handleSubmit(onSubmit)}
        className={className}
      >
        {children}
      </form>
    </FormProvider>
  );
}

export default Form;
