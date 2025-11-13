import type { BookModuleDocumentType } from 'types/generated/sanity-types-generated';
import { ContentContainer } from '@/ui/content-container/content-container';
import { tv } from 'tailwind-variants';
import { ContactUsModuleForm } from './subs/contact-us-module-form';

type TProps = {
  module: BookModuleDocumentType;
};

export async function ContactUsModule({ module }: TProps) {
    const { outerContainerTv, innerContainerTv, headersContainerTv, h1Tv, subH1Tv, h2Tv, formContainerTv } = styleTv();
        return (
            <div className={outerContainerTv()}>
        <ContentContainer>
            <div className={innerContainerTv()}>
                <div className={headersContainerTv()}>
                    <h1 className={h1Tv()}>Contact us</h1>
                    <p className={subH1Tv()}>Not sure what you are looking for? Let us know and we will help you find the perfect solution.</p>
                </div> 
            <div className={formContainerTv()}>
                <h2 className={h2Tv()}>Ask anything you<br /> need to know!</h2>
                <ContactUsModuleForm />
            </div>
            </div>
        </ContentContainer>
    </div>
  );
}

const styleTv = tv({
    slots: {
        outerContainerTv: 'min-h-dvh bg-primary',
        innerContainerTv: 'pt-20 grid grid-cols-[1fr_1fr] justify-center items-center gap-40 text-primary-text',
        headersContainerTv: 'flex flex-col gap-4 justify-center',
        h1Tv: 'text-7xl',
        subH1Tv: 'prose-xl',
        formContainerTv: 'bg-bg text-bg-text p-10 rounded-2xl flex flex-col gap-8',
        h2Tv: 'text-3xl leading-10',
    }
});