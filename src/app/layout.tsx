import 'pretendard/dist/web/variable/pretendardvariable.css';

import Layout from '@/components/commons/Layout';
import '@/styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className="bg-[#1A1A1E]">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
