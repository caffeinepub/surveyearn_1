import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";

export default function Login() {
  const router = useRouter();
  const { login, token, getActor } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: router.navigate is stable
  useEffect(() => {
    if (token) router.navigate({ to: "/dashboard" });
  }, [token, router.navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    setIsPending(true);
    try {
      const actor = await getActor();
      if (mode === "signup") {
        const res = await actor.register(username.trim(), password);
        if ("err" in res) {
          setError(res.err);
          return;
        }
        const newToken = res.ok;
        const profileRes = await actor.getProfile(newToken);
        if ("err" in profileRes) {
          setError(profileRes.err);
          return;
        }
        login(newToken, profileRes.ok);
        router.navigate({ to: "/dashboard" });
      } else {
        const res = await actor.login(username.trim(), password);
        if ("err" in res) {
          setError(res.err);
          return;
        }
        const newToken = res.ok;
        const profileRes = await actor.getProfile(newToken);
        if ("err" in profileRes) {
          setError(profileRes.err);
          return;
        }
        login(newToken, profileRes.ok);
        router.navigate({ to: "/dashboard" });
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="min-h-screen bg-brand-aqua flex flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <a href="/" className="text-2xl font-extrabold text-primary">
            SurveyEarn
          </a>
          <p className="text-muted-foreground mt-1 text-sm">
            Earn rewards for your opinions
          </p>
        </div>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-4">
            <CardTitle className="text-secondary-foreground text-xl">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Sign in to access your dashboard"
                : "Start earning rewards today"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="flex rounded-full bg-muted p-1 mb-6"
              data-ocid="auth.tab"
            >
              <button
                type="button"
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                  mode === "login"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                data-ocid="auth.login.tab"
              >
                Login
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
                  mode === "signup"
                    ? "bg-primary text-primary-foreground shadow-xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => {
                  setMode("signup");
                  setError("");
                }}
                data-ocid="auth.signup.tab"
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 rounded-lg"
                  data-ocid="auth.username.input"
                  autoComplete="username"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="rounded-lg pr-10"
                    data-ocid="auth.password.input"
                    autoComplete={
                      mode === "login" ? "current-password" : "new-password"
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPass(!showPass)}
                    tabIndex={-1}
                  >
                    {showPass ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div
                  className="text-destructive text-sm bg-destructive/10 rounded-lg px-3 py-2"
                  data-ocid="auth.error_state"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full rounded-full bg-primary text-primary-foreground font-semibold py-3"
                disabled={isPending}
                data-ocid="auth.submit_button"
              >
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                {isPending
                  ? "Please wait..."
                  : mode === "login"
                    ? "Sign In"
                    : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
