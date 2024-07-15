import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { getSession } from "@/utils/actions";
import prisma from "@/utils/connection";
import React from "react";
import Footer from "@/components/Footer";

const EcommerceLayout = async ({ children }) => {
  const categories = await prisma.Category.findMany();

  // Convert categories to plain objects
  const plainCategories = categories.map(category => ({
    ...category,
    createdAt: category.createdAt.toISOString(),
  }));

  const session = await getSession();

  // Ensure session is a plain object
  const plainSession = session ? {
    ...session,
    user: {
      ...session.user,
    },
  } : null;

  return (
    <div>
      <Toaster />
      <Header categories={plainCategories} session={plainSession} />
      {children}
      <Footer/>
    </div>
  );
};

export default EcommerceLayout;

