'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isNil, isNotNil } from 'es-toolkit';
import { Form } from 'react-aria-components';
import { type FieldErrors, useForm } from 'react-hook-form';
import { toastQueue } from '@/layout/toast-notification/subs/toast-queue';
import { Button } from '@/ui/buttons/button/button';
import { FormTextField } from '@/ui/form-fields/form-text-field/form-text-field';
import { contactUsFormSchema, ContactUsFormSchema } from 'data/contact-us-form-schema';
import { FormTextAreaField } from '@/ui/form-fields/form-text-area-field/form-text-area-field';


export const ContactUsModuleForm = () => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { isSubmitting }
  } = useForm<ContactUsFormSchema>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      fullName: '',
      companyName: null,
      email: '',
      message: '',
    }
  });

  const onValid = async (data: ContactUsFormSchema) => {
    const result = isNotNil(console.log("send email"));
    console.log(data);

    if (result) {
      toastQueue.add(
        {
          kind: 'success',
          title: 'Email sent successfully',
          description: `Your email has been sent successfully`
        },
        { timeout: 5000 }
      );
    } else {
      toastQueue.add(
        {
          kind: 'error',
          title: 'Email sending failed',
          description: 'There was an error sending your email, please try again'
        },
        { timeout: 5000 }
      );
    }
  };

  const onInvalid = (errors: FieldErrors<ContactUsFormSchema>) => {
    console.log(errors);
    console.log(getValues());
  };

  return (
    <Form onSubmit={handleSubmit(onValid, onInvalid)} className='flex flex-col gap-4 w-full mx-auto'>
      <div className='flex flex-col sm:grid sm:grid-cols-2 gap-4'>
        <FormTextField control={control} type='text' label='Full name' name='fullName' isRequired={true} />
        <FormTextField control={control} type='text' label='Company/Studio' name='companyName' />
      </div>
      <FormTextField control={control} type='email' label='Email' name='email' isRequired={true} />
       <FormTextAreaField
        control={control}
        label='Message'
        name='message'
        rows={4}
        isRequired={true}
      />
      <div>
        <Button
          type='submit'
          className='min-w-2xs mt-10'
          size='large'
          variant='primary'
          surface='bg'
          isDisabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </Form>
  );
};
