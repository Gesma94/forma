import { ContentContainer } from '@/ui/content-container/content-container';
import { q, runQuery } from 'utils/groqd-client';

export async function Footer() {
  const query = q.star.filterByType('footerDocumentType').slice(0);
  const result = await runQuery(query)

  console.log(result);
  
  return (
    <footer className='bg-primary'>
      <ContentContainer>
        <h3>{result.heading}</h3>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </ContentContainer>
    </footer>
  );
}
