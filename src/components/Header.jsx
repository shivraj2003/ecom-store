"use client";
import React, { forwardRef } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { components } from "@/utils/data";
import { Input } from "./ui/input";
import { LogIn } from 'lucide-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GanttChart, Heart, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { logout } from "@/utils/actions";

const Header = ({ categories, session }) => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-between items-center h-20 px-[10%]">
        <Link href="/">
          <Image src="/logo.png" className="cursor-pointer bg-blend-lighten" alt="" width={80} height={80} />
        </Link>
        <div className="text-md flex items-center gap-5">
          <Link href="/" className="hidden sm:block">
            Home
          </Link>
          <div className="hidden sm:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {categories.map((component) => (
                        <ListItem
                          key={component.id}
                          title={component.name}
                          href={`/products?cat=${component.id}`}
                          image={component.image}
                          className="h-8 w-8"
                           >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Input className="h-8 hidden sm:block" placeholder="Search" />
          <Link href="/wishlist">
            <Heart size={20} />
          </Link>
          <Link href="/addtocart">
            <ShoppingCart size={20} />
          </Link>
          {session?.isLoggedIn ? (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={session?.user?.image}
                    alt={session?.user?.name}
                  />
                  <AvatarFallback>
                    {session?.user?.name?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-60">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      {session?.user?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {session?.user?.email}
                    </p>
                    <Separator className="my-4" />
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard size={20} /> <span>Dashboard</span>
                    </Link>
                    <Separator className="my-4" />
                    <form action={logout}>
                      <button className="cursor-pointer border-none outline-none flex items-center gap-2">
                        Logout
                      </button>
                    </form>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ) : null}

  
          {session?.isLoggedIn ? null : (
            <Link href="/login">
              
              <LogIn size={20} />
            </Link>
          )}

          <div>
            <GanttChart size={20}  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

const ListItem = forwardRef(
  ({ className, title, image, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none flex items-center gap-4">
              <Image 
                src={image} 
                alt={title} 
                layout="responsive"
                width={100}
                height={100}
                 // Set your desired height
                
              />
              <h2>{title}</h2>
            </div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";


