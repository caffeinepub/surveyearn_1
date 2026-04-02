import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "@tanstack/react-router";
import { ClipboardList, Loader2, LogOut, Star, TrendingUp } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

export default function Dashboard() {
  const router = useRouter();
  const { profile, token, logout, refreshBalance, isLoading } = useAuth();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.navigate is stable
  useEffect(() => {
    if (!isLoading && !token) {
      router.navigate({ to: "/login" });
    }
  }, [token, isLoading, router.navigate]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount
  useEffect(() => {
    if (token) refreshBalance();
  }, []);

  async function handleLogout() {
    await logout();
    router.navigate({ to: "/" });
  }

  if (isLoading || !profile) {
    return (
      <div
        className="min-h-screen bg-brand-aqua flex items-center justify-center"
        data-ocid="dashboard.loading_state"
      >
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  const balance = Number(profile.balance);

  return (
    <div className="min-h-screen bg-brand-aqua flex flex-col">
      <header className="bg-white border-b border-border px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">SurveyEarn</span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              Hi,{" "}
              <strong className="text-foreground">{profile.username}</strong>
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive rounded-full"
              onClick={handleLogout}
              data-ocid="dashboard.logout.button"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-secondary-foreground mb-1">
              Welcome back, {profile.username}! 👋
            </h1>
            <p className="text-muted-foreground mb-8">
              Here&apos;s your earnings overview
            </p>

            <div className="grid sm:grid-cols-3 gap-5 mb-8">
              <Card
                className="sm:col-span-1 shadow-card bg-primary text-primary-foreground border-0"
                data-ocid="dashboard.balance.card"
              >
                <CardContent className="pt-6 pb-6 text-center">
                  <p className="text-primary-foreground/70 text-sm font-medium mb-2">
                    Total Balance
                  </p>
                  <p className="text-4xl font-extrabold">
                    {balance}{" "}
                    <span className="text-2xl font-semibold">pts</span>
                  </p>
                  <p className="text-primary-foreground/60 text-xs mt-1">
                    ${(balance * 0.01).toFixed(2)} USD value
                  </p>
                </CardContent>
              </Card>

              <Card
                className="shadow-card border-border"
                data-ocid="dashboard.surveys.card"
              >
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-secondary-foreground">
                    ∞
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Surveys Available
                  </p>
                </CardContent>
              </Card>

              <Card
                className="shadow-card border-border"
                data-ocid="dashboard.earning.card"
              >
                <CardContent className="pt-6 pb-6 text-center">
                  <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Star className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <p className="text-2xl font-bold text-secondary-foreground">
                    $0.50–$5
                  </p>
                  <p className="text-muted-foreground text-sm">Per Survey</p>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-card border-border">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-secondary-foreground mb-2">
                  Ready to earn more?
                </h2>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                  Take a survey now and earn points instantly. Your balance
                  updates automatically after each completion.
                </p>
                <Button
                  size="lg"
                  className="rounded-full bg-primary text-primary-foreground px-10 font-semibold hover:opacity-90 transition-opacity"
                  onClick={() => router.navigate({ to: "/survey" })}
                  data-ocid="dashboard.start_survey.primary_button"
                >
                  Start Survey
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <footer className="text-center text-xs text-muted-foreground py-6">
        &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          className="text-primary hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
