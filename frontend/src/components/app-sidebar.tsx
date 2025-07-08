import * as React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Store } from "lucide-react";
import { AppSidebarNav } from "./app-sidebar-nav";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Alert>
          <Store />
          <AlertTitle>Welcome</AlertTitle>
          <AlertDescription>Have a look at our products</AlertDescription>
        </Alert>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNav />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
