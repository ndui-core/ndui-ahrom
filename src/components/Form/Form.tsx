import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

interface FormProps<T extends z.ZodType> {
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  children: React.ReactNode;
  className?: string;
}

function Form<T extends z.ZodType>({ 
  schema, 
  onSubmit, 
  children, 
  className = '' 
}: FormProps<T>) {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {} as z.infer<T>,
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
