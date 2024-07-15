import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const ImageList = ({ images }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-40 h-40 max-w-xs relative"
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative w-40 h-40">
              <Image 
                src={image}  
                alt={`Image ${index}`} 
                width={640} 
                height={480}
                className="object-contain" 
              />
              <div></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 h-7 w-7 bg-slate-300" />
      <CarouselNext className="absolute right-2 h-7 w-7 bg-slate-300" />
    </Carousel>
  );
};

export default ImageList;

