"use client";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Home = () => {
  return (
    <>
      <main className=" max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-12 flex-grow flex flex-col items-center justify-center">
        <section className=" text-center mb-8 md:mb-12">
          <h1 className=" text-4xl font-bold">
            Dive into the World of Anonymous Conversations
          </h1>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-xs"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </main>
    </>
  );
};

export default Home;
