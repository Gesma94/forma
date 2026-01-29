'use server';

import { isNotNil } from 'es-toolkit';
import { Resend } from 'resend';
import { FormaEmailTemplate, type TFormaEmailTemplateProps } from '@/layout/emails/forma-email-template';
import { postDiscord } from './discord';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(props: TFormaEmailTemplateProps & { reason?: string }): Promise<boolean> {
  // Early return when honeypot input is filled. We pretend the delivery was successful
  if (props.reason !== '') {
    return true;
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Forma Webite <onboarding@resend.dev>',
      to: [process.env.RESEND_EMAIL_TO],
      subject: `New message from ${props.fullName}`,
      react: FormaEmailTemplate(props)
    });

    if (isNotNil(error)) {
      await postDiscord('⚠️ Resend email sent failed! ⚠️', props);
      return false;
    }

    return true;
  } catch (_) {
    await postDiscord('⚠️ Resend email sent failed! ⚠️', props);
    return false;
  }
}
