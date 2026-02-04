"use client";

import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from "@/context/auth-context";
import { useEffect } from "react";
import { Package, Warehouse, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons/logo";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else if (user && !user.isAdmin) {
      router.push('/');
    }
  }, [user, router]);
  
  if (!user?.isAdmin) {
    return null; // or a loading/access denied screen
  }

  const navItems = [
    { href: '/admin/orders', label: 'Orders', icon: Package },
    { href: '/admin/inventory', label: 'Inventory', icon: Warehouse },
  ];

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-card lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link href="/admin/orders" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-auto" />
              <span className="">Admin</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
