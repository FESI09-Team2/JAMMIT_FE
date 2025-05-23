import Gnb from './Gnb';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1A1A1E]">
      <Gnb />
      <main className="p-[3.75rem]">{children}</main>
    </div>
  );
}
