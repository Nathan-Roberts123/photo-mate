import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/main-nav";
import CreatePostModal from "@/components/create-post-modal";
import { Toaster } from "@/components/ui/toaster";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "post-mate",
  description: "Create blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <CreatePostModal id="post-modal" ariaHiddedn={true} />
        </Provider>
        <div className="max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4">
          <div>{children}</div>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
