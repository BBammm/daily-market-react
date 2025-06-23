import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";
import Header from "@/shared/header/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: '어글리어스 쇼핑몰',
    template: '%s | 어글리어스 쇼핑몰',
  },
  description: '간편하게 쇼핑하고, 다양한 상품을 장바구니에 담아보세요. 어글리어스 온라인 쇼핑몰 과제 프로젝트.',
  manifest: '/manifest.json',
  themeColor: '#B92F25',
  keywords: ['어글리어스', '쇼핑몰', '장바구니', '온라인몰', '프론트엔드 과제'],
  authors: [{ name: '어글리어스 프론트엔드 과제', url: 'https://uglyus.co.kr' }],
  creator: '김근영',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://uglyus.co.kr',
    title: '어글리어스 쇼핑몰',
    description: '간편하게 장바구니에 담고, 최종 결제까지! 어글리어스 프론트엔드 과제 프로젝트.',
    siteName: '어글리어스 쇼핑몰',
    images: [
      {
        url: 'https://placehold.co/1200x630?text=어글리어스%20쇼핑몰%20프론트엔드%20과제',
        width: 1200,
        height: 630,
        alt: '어글리어스 프론트엔드 과제 썸네일',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="top-center" reverseOrder={false} />
        <Header/>
        {children}
      </body>
    </html>
  );
}