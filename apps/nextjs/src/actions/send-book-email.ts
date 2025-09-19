'use server'

import { BookFormSchema } from "data/book-form-schema";

export async function sendBookEmail(data: BookFormSchema): Promise<boolean> {
    const a = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "content-type": "application/json",
           "api-key": "",
        },
        body: JSON.stringify(
            {
  "sender": {
    "name": "Brevo Mail Sender",
    "email": "gesma94@gmail.com"
  },
  "to": [
    {
      "email": "gesma94+testbrevo@gmail.com"
    }
  ],
  "subject": "Test Email",
  "htmlContent": "<html><body><h1>Hello</h1></body></html>"
}
        )
    })

    const b = await a.json();
    console.log(b);

    return true;
}