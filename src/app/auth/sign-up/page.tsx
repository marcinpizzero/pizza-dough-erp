// src/app/auth/sign-up/page.tsx
import { signUp } from "@/app/auth/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">🍕 Rejestracja</CardTitle>
          <p className="text-sm text-muted-foreground">Utwórz konto demo</p>
        </CardHeader>
        <CardContent>
          <form action={signUp} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="twoj@email.pl"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Hasło</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Min. 6 znaków"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Zarejestruj
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Masz już konto?{" "}
            <Link href="/auth/sign-in" className="text-primary hover:underline">
              Zaloguj się
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}