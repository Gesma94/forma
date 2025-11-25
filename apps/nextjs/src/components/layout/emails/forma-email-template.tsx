import { isNotNil } from 'es-toolkit';

export type TFormaEmailTemplateProps = {
  fullName: string;
  company?: string;
  email: string;
  message: string;
};

export function FormaEmailTemplate({ email, fullName, company, message }: TFormaEmailTemplateProps) {
  return (
    <div>
      <h1>New email from {fullName}!</h1>
      {isNotNil(company) && <p>Company: {company}</p>}
      <p>Email: {email}</p>
      <hr />
      <p>{message}</p>
    </div>
  );
}
