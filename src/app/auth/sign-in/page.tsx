// src/app/auth/sign-in/page.tsx
import { signIn } from "@/app/auth/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🍕 PIZZA DOUGH ERP</CardTitle>
          <p className="text-sm text-muted-foreground">Zaloguj się do systemu</p>
        </CardHeader>
        <CardContent>
          <form action={signIn} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="demo@pizza.pl"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Zaloguj
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Nie masz konta?{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Zarejestruj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}