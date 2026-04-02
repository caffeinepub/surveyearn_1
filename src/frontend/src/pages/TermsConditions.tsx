import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useRouter } from "@tanstack/react-router";

export default function TermsConditions() {
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
            data-ocid="terms.back.button"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-secondary-foreground mb-2">
            Terms &amp; Conditions
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
                  1. Accurate Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By using SurveyEarn, you agree to provide accurate, complete,
                  and truthful information during registration and throughout
                  your use of the platform. Providing false or misleading
                  information may result in account suspension or termination.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  2. One Account Per User
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Each individual is permitted to create and maintain only one
                  account on SurveyEarn. Creating multiple accounts to earn
                  additional rewards is strictly prohibited and will result in
                  all associated accounts being permanently banned.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  3. No Fraudulent Activity
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Any form of fraudulent activity is strictly prohibited,
                  including but not limited to: using bots or automated tools to
                  complete surveys, manipulating the reward system, or
                  attempting to exploit platform vulnerabilities. Violations
                  will result in immediate account termination.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  4. Reward Revocation
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SurveyEarn reserves the right to revoke earned rewards or
                  points at any time if abuse, fraud, or a violation of these
                  Terms is detected. Rewards are not considered final until they
                  are redeemed.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardContent className="pt-6 pb-6">
                <h2 className="text-lg font-bold text-secondary-foreground mb-2">
                  5. Platform Rules May Change
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SurveyEarn reserves the right to modify, update, or revise
                  these Terms &amp; Conditions at any time without prior notice.
                  Continued use of the platform after changes are made
                  constitutes your acceptance of the revised terms. We encourage
                  you to review this page periodically.
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
