import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { navItems } from "./nav-items";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <nav className="bg-primary text-primary-foreground p-4">
          <ul className="flex space-x-4 justify-center">
            {navItems.map(({ title, to, icon }) => (
              <li key={to}>
                <Link to={to} className="flex items-center space-x-2 hover:underline">
                  {icon}
                  <span>{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Routes>
          {navItems.map(({ to, page }) => (
            <Route key={to} path={to} element={page} />
          ))}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
