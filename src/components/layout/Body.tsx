import React, { useEffect } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import { linkEnum } from "@/types/enums/link";

interface BodyProps {
  pageName: linkEnum;
  children: React.ReactNode[] | React.ReactNode;
}

function Body(props: BodyProps) {
  const { children, pageName } = props;

  useEffect(() => {
    document.title = `ClickMoneyPro | ${pageName}`;
  }, [pageName]);

  return (
    <section className="min-h-screen w-full flex">
      <Sidebar />
      <main className="w-full md:w-[calc(100%-300px)]">
        <Navbar />
        <section className="bg-light p-7 space-y-6 min-h-[calc(100vh-100px)]">
          {children}
        </section>
      </main>
    </section>
  );
}

export default Body;
