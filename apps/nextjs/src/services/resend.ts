'use server';

import { Resend } from 'resend';
import { FormaEmailTemplate, type TFormaEmailTemplateProps } from '@/layout/emails/forma-email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(props: TFormaEmailTemplateProps): Promise<boolean> {
  try {
    const { error } = await resend.emails.send({
      from: 'Forma Webite <onboarding@resend.dev>',
      to: [],
      subject: `New message from ${props.fullName}`,
      react: FormaEmailTemplate(props)
    });

    return !error;
  } catch (error) {
    console.error(error);
    return error;
  }
}
