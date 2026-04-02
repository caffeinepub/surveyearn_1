import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link, useRouter } from "@tanstack/react-router";
import { CheckCircle, Mail } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

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
            data-ocid="contact.back.button"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="flex-1 px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-secondary-foreground mb-2">
            Contact Us
          </h1>
          <p className="text-muted-foreground mb-8">
            Have a question or need help? We&apos;d love to hear from you.
          </p>

          <Card className="shadow-card border-border mb-6">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-2 mb-6">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  You can also email us directly at{" "}
                  <a
                    href="mailto:contact@surveyearn.com"
                    className="text-primary hover:underline font-medium"
                  >
                    contact@surveyearn.com
                  </a>
                </span>
              </div>

              {submitted ? (
                <div
                  className="text-center py-8"
                  data-ocid="contact.success_state"
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-secondary-foreground mb-2">
                    Message Sent!
                  </h2>
                  <p className="text-muted-foreground">
                    Thank you! We&apos;ll get back to you soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.panel"
                >
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      required
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      required
                      data-ocid="contact.input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={form.message}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, message: e.target.value }))
                      }
                      required
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                    data-ocid="contact.submit_button"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
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
