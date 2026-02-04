import Link from "next/link";
import { Search } from "lucide-react";
import { Logo } from "@/components/icons/logo";
import { Input } from "@/components/ui/input";
import { UserNav } from "@/components/user-nav";
import { CartSheet } from "@/components/cart-sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="h-6 w-auto" />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="flex-1 sm:flex-initial">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </form>
          </div>
          <nav className="flex items-center space-x-1">
            <UserNav />
            <CartSheet />
          </nav>
        </div>
      </div>
    </header>
  );
}
