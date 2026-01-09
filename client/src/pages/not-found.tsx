import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4">
      <div className="glass-panel p-8 md:p-12 rounded-2xl max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="bg-destructive/10 p-4 rounded-full">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold font-display text-white">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-white">System Malfunction</h2>
          <p className="text-muted-foreground">
            The sector you are trying to reach does not exist or has been lost to the void.
          </p>
        </div>

        <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors w-full">
          Return to Council
        </Link>
      </div>
    </div>
  );
}
