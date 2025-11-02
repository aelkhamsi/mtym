import SectionContainer from '@/app/components/section-container'

export default async function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SectionContainer className="pt-24 pb-20 z-0">
      {children}
    </SectionContainer>
  );
}
