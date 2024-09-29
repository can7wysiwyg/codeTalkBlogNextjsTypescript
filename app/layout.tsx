import type { Metadata } from "next";
import localFont from "next/font/local";
import NavMenu from "./components/menuBar/NavMenu";
import Script from "next/script";
import Head from "next/head";
import "bootstrap/dist/css/bootstrap.min.css"
import "./globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import MobileMenu from "./components/menuBar/DropMenu";
import Footer from "./Footer";




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

<Head>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg==" crossOrigin="anonymous" referrerPolicy="no-referrer" />


        </Head>
      <body  >
        
     
        <NavMenu />
        <main>
        <section className="section">
  <div className="container">


        
  
        {children}

        </div>






</section>
</main>

        <Footer />

      
      
        <Script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" />
        
        



      </body>
    </html>
  );
}
