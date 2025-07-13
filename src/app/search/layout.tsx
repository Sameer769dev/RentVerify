
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <SidebarProvider>
          <div className="flex-grow flex flex-col h-screen">{children}</div>
      </SidebarProvider>
  );
}
