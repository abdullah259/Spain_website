import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import BuyRent from "./pages/BuyRent";
import Sell from "./pages/Sell";
import Agent from "./pages/Agent";
import Company from "./pages/Company";
import Locations from "./pages/Locations";
import Watchlist from "./pages/Watchlist";
import Contact from "./pages/Contact";
import Invest from "./pages/Invest";
import Construction from "./pages/Construction";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/buy-rent"} component={BuyRent} />
      <Route path={"/sell"} component={Sell} />
      <Route path={"/agent"} component={Agent} />
      <Route path={"/company"} component={Company} />
      <Route path={"/locations"} component={Locations} />
      <Route path={"/watchlist"} component={Watchlist} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/invest"} component={Invest} />
      <Route path={"/construction"} component={Construction} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <ThemeProvider
          defaultTheme="light"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
