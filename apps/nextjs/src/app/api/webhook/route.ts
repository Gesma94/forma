import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
  console.log(request);

  try {
    const text = await request.text();
    console.log('Received webhook payload:', text);
  } catch (error) {
    console.error('Error processing webhook payload:', error);
  }

  revalidatePath('/');

  return new Response('Webhook received', { status: 200 });
}
