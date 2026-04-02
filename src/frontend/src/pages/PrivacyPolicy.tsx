import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useRouter } from "@tanstack/react-router";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-brand-aqua flex flex-col">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="text-xl font-bold text-primary">
            SurveyEarn
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            onClick={() => router.navigate({ to: "/dashboard" })}
            data-ocid="privacy.back.button"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-secondary-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm mb-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="space-y-5">
            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  1. Data We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We collect the following information when you register or use
                  SurveyEarn:
                </p>
                <ul className="mt-3 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>
                    Email address (used for account registration and
                    communication)
                  </li>
                  <li>Username and account credentials</li>
                  <li>
                    Usage data such as survey activity, points earned, and login
                    history
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  2. How We Use Your Data
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is used solely to provide and improve the SurveyEarn
                  service. This includes:
                </p>
                <ul className="mt-3 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>
                    Processing survey completions and crediting rewards to your
                    account
                  </li>
                  <li>Sending account-related notifications and updates</li>
                  <li>Preventing fraud and ensuring platform integrity</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  3. Third Parties
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do <strong>not</strong> sell, trade, or rent your personal
                  information to third parties. We may share data with survey
                  partners (such as CPX Research) only to the extent required to
                  facilitate survey delivery and reward processing.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  4. Cookies
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SurveyEarn may use cookies or local storage to manage your
                  session and keep you logged in across visits. These are
                  essential for the platform to function correctly and are not
                  used for advertising purposes.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  5. Contact
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions or concerns about this Privacy
                  Policy, please contact us at:{" "}
                  <a
                    href="mailto:contact@surveyearn.com"
                    className="text-primary hover:underline font-medium"
                  >
                    contact@surveyearn.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-white py-6 px-6 mt-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} SurveyEarn. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="text-primary hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              caffeine.ai
            </a>
          </span>
          <div className="flex items-center gap-3">
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="text-primary hover:underline">
              Terms &amp; Conditions
            </Link>
            <span>|</span>
            <Link to="/contact" className="text-primary hover:underline">
              Contact Us
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
