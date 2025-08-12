import { ContentContainer } from '@/ui/content-container/content-container';

export function Footer() {
  return (
    <footer className='bg-primary'>
      <ContentContainer>
        <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
      </ContentContainer>
    </footer>
  );
}
