import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Baithak! 👋',
  description: 'A real time chat app, Sinh ni baithak!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
