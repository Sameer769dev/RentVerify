
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
          {children}
      </SidebarProvider>
  );
}
