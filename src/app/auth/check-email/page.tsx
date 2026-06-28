// src/app/auth/check-email/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <Mail className="h-12 w-12 mx-auto text-primary" />
          <CardTitle className="text-2xl mt-4">Sprawdź e-mail</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Wysłaliśmy link aktywacyjny na Twój adres e-mail.
            Kliknij w link, aby aktywować konto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}