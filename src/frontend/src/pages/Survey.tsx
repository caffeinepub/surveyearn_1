import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, Info, Loader2, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

const CPX_APP_ID = "YOUR_APP_ID";

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

  const surveyUrl = `https://offers.cpx-research.com/index.php?app_id=${CPX_APP_ID}&ext_user_id=${profile.userId}`;

  return (
    <div className="h-screen flex flex-col bg-background">
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

      <div className="bg-brand-aqua border-b border-border px-4 py-2 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-muted-foreground">
          <Info className="h-3.5 w-3.5 text-primary flex-shrink-0" />
          Complete surveys to earn rewards. Your balance will update
          automatically after each submission.
        </div>
      </div>

      <div className="flex-1 relative" data-ocid="survey.canvas_target">
        <iframe
          src={surveyUrl}
          title="CPX Research Surveys"
          className="w-full h-full border-0"
          allow="camera; microphone"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
        />
      </div>
    </div>
  );
}
