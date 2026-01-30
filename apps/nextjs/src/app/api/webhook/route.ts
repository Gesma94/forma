import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { isNil } from 'es-toolkit';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  const signature = request.headers.get(SIGNATURE_HEADER_NAME);

  if (isNil(secret)) {
    return new Response('Webhook secret is not configured', { status: 500 });
  }
  if (isNil(signature)) {
    return new Response('Missing signature header', { status: 400 });
  }

  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch (_) {
    return new Response('Failed to read request body', { status: 400 });
  }

  if (!(await isValidSignature(bodyText, signature, secret))) {
    return new Response('Invalid signature', { status: 401 });
  }

  revalidateTag('sanity');
  revalidatePath('/', 'layout');

  return new Response('Webhook received', { status: 200 });
}
