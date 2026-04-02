import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, ClipboardList, Loader2, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

export default function Survey() {
  const router = useRouter();
  const { profile, token, isLoading, refreshBalance } = useAuth();

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.navigate is stable
  useEffect(() => {
    if (!isLoading && !token) {
      router.navigate({ to: "/login" });
    }
  }, [token, isLoading, router.navigate]);

  if (isLoading || !profile) {
    return (
      <div
        className="min-h-screen bg-brand-aqua flex items-center justify-center"
        data-ocid="survey.loading_state"
      >
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-brand-aqua">
      <header className="bg-white border-b border-border px-4 py-3 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full text-muted-foreground hover:text-foreground"
              onClick={() => router.navigate({ to: "/dashboard" })}
              data-ocid="survey.back.button"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Dashboard
            </Button>
            <span className="text-sm font-semibold text-foreground hidden sm:block">
              CPX Research Surveys
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="bg-primary/10 text-primary text-sm font-bold px-3 py-1.5 rounded-full"
              data-ocid="survey.balance.panel"
            >
              {Number(profile.balance)} pts
            </div>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border text-muted-foreground hover:text-foreground"
              onClick={() => refreshBalance()}
              data-ocid="survey.refresh.button"
            >
              <RefreshCw className="h-3.5 w-3.5 mr-1" /> Refresh
            </Button>
          </div>
        </div>
      </header>

      <div
        className="flex-1 flex items-center justify-center px-6 py-16"
        data-ocid="survey.panel"
      >
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ClipboardList className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-secondary-foreground mb-3">
            Coming Soon
          </h1>
          <p className="text-muted-foreground text-base mb-8">
            Surveys will be available after approval
          </p>
          <Button
            size="lg"
            className="rounded-full bg-primary text-primary-foreground px-10 font-semibold hover:opacity-90 transition-opacity"
            onClick={() => router.navigate({ to: "/dashboard" })}
            data-ocid="survey.back_dashboard.primary_button"
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
