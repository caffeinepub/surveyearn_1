import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { CheckCircle, DollarSign, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const steps = [
  {
    icon: Users,
    title: "Sign Up",
    desc: "Create your free account in seconds. No credit card needed.",
  },
  {
    icon: CheckCircle,
    title: "Take Surveys",
    desc: "Browse available surveys and share your genuine opinions.",
  },
  {
    icon: Star,
    title: "Earn Points",
    desc: "Accumulate points with every completed survey you submit.",
  },
  {
    icon: DollarSign,
    title: "Get Rewards",
    desc: "Redeem your points for real cash rewards and gift cards.",
  },
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <header className="w-full bg-white border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="text-xl font-bold text-primary">SurveyEarn</span>
          <Button
            variant="outline"
            className="rounded-full border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => router.navigate({ to: "/login" })}
            data-ocid="nav.login.button"
          >
            Login
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-brand-aqua flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground leading-tight mb-5">
              Turn Your Opinions
              <br />
              <span className="text-primary">Into Rewards</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8 max-w-md">
              Complete surveys, earn real rewards. Join thousands already
              earning from home.
            </p>
            <Button
              size="lg"
              className="rounded-full bg-primary text-primary-foreground px-10 py-4 text-lg font-semibold shadow-card hover:opacity-90 transition-opacity"
              onClick={() => router.navigate({ to: "/login" })}
              data-ocid="hero.primary_button"
            >
              Start Earning
            </Button>
            <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" /> Free to join
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" /> Instant payouts
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-primary" /> 10k+ members
              </span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden md:block"
          >
            <img
              src="/assets/generated/hero-survey-earn.dim_800x500.png"
              alt="Survey Earning"
              className="rounded-2xl shadow-card w-full"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
            <div
              className="rounded-2xl bg-white shadow-card p-8 text-center"
              style={{ display: "none" }}
              id="hero-fallback"
            >
              <div className="text-6xl mb-4">💰</div>
              <p className="text-primary font-bold text-xl">
                Earn While You Share
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Four simple steps to start earning today
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-brand-aqua rounded-2xl p-6 text-center shadow-xs hover:shadow-card transition-shadow"
                data-ocid={`home.item.${i + 1}`}
              >
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="text-xs font-bold text-primary uppercase tracking-widest mb-2">
                  Step {i + 1}
                </div>
                <h3 className="font-bold text-secondary-foreground text-lg mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-14 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-white text-3xl font-bold mb-4">
            Ready to Start Earning?
          </h2>
          <p className="text-white/80 mb-8">
            Join thousands of people earning rewards with their spare time.
          </p>
          <Button
            size="lg"
            className="rounded-full bg-accent text-accent-foreground font-bold px-10 hover:opacity-90 transition-opacity"
            onClick={() => router.navigate({ to: "/login" })}
            data-ocid="cta.primary_button"
          >
            Create Free Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-foreground text-white/70 py-8 px-6 text-center text-sm">
        <p className="mb-1 font-semibold text-white">SurveyEarn</p>
        <p>
          &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            className="text-accent hover:underline"
            target="_blank"
            rel="noreferrer"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
