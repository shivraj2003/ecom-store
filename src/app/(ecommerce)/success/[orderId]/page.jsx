"use client";
import { toast } from "@/components/ui/use-toast";
import { confirmOrder } from "@/services/orders";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Image from "next/image";

const Success = ({ params }) => {
  const { orderId } = params;
  const router = useRouter();

  const updateOrder = async () => {
    if (params.orderId) {
      const update = await confirmOrder(orderId);
      if (update.error) {
        toast({ title: update.error });
      } else {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    updateOrder();
  });
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <>
          <Image src="https://i.gifer.com/7efs.gif" alt="" className="mx-auto" />
          <p className="text-green-500 text-center mt-4">
            Your Payment is successful. Thank you for your purchase.
          </p>
        </>
      </div>
    </div>
  );
};

export default Success;
