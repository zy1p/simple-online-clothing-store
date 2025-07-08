import { AppSidebar } from "@/components/app-sidebar";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function AppLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
