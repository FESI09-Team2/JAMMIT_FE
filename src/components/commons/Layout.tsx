import Gnb from './Gnb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Gnb />
      <main className="p-[3.75rem]">{children}</main>
    </>
  );
}
