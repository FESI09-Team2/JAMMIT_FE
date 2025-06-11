import 'pretendard/dist/web/variable/pretendardvariable.css';
import Layout from '@/components/commons/Layout';
import '@/styles/globals.css';
import Providers from './providers';
import GlobalErrorModalProvider from '@/components/commons/Modal/GlobalErrorModalProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <GlobalErrorModalProvider />
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
