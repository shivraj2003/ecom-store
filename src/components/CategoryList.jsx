import React from "react";
import Title from "./Title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const CategoryList = ({ categories }) => {
  return (
    <div>
      <Title title="Categories" heading="Browse By Category" />
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full"
      >
        <CarouselContent>
          {categories?.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <Link href={`/products?cat=${cat.id}`}>
                <div className="border-2 bg-secondaryColor rounded-md h-40 w-40 flex justify-center items-center flex-col gap-2 p-2">
                  <Image 
                     src={cat?.image || '/arrival_3.png'}
                   height={130}
                   width={130}
                    
                    alt={cat?.name} 
                    
                  />
                  <p>{cat.name}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-[75%] lg:left-[92%] top-[-25px] bg-slate-300" />
        <CarouselNext className="absolute right-0 top-[-25px] bg-slate-300" />
      </Carousel>
    </div>
  );
};

export default CategoryList;

