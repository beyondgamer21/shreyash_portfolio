import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-dark">
      <Card className="w-full max-w-md mx-4 bg-dark/50 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2 items-center">
            <AlertCircle className="h-8 w-8 text-secondary" />
            <h1 className="text-2xl font-bold text-light">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-gray-400">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-6">
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
