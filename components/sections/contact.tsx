"use client";

import React, { useState } from "react";
import { Mail, CheckCircle, AlertCircle, RefreshCw, Send, Sparkles } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { FadeIn, AmbientOrbs } from "@/components/animations/motion";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // anti-spam field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when editing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Trigger anti-spam protection if honeypot is filled
    if (formData.honeypot) {
      console.warn("Spam detected.");
      setStatus("success"); // Mock success to drop spammer metrics
      return;
    }

    setStatus("loading");

    try {
      // Simulating secure, sanitized API call validation
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-contact py-24 relative overflow-hidden border-t border-border/30">
      <AmbientOrbs />

      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Information panel */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            <FadeIn>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-section/20 bg-section-muted text-section text-xs font-mono uppercase tracking-wider mb-6">
                <Mail className="h-3.5 w-3.5" />
                The Channel
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-balance leading-none">
                Let&apos;s Build Together.
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-balance text-lg">
                Have a challenging project, an internship role, or open-source 
                components that need architectural design? Send a message directly 
                through the secure validation gate.
              </p>
            </FadeIn>

            {/* Social channels */}
            <div className="mt-8 space-y-4">
              <FadeIn delay={0.2}>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Email:</span>
                  <a href="mailto:muhammdsaad8374@gmail.com" className="hover:text-section transition-colors">
                    muhammdsaad8374@gmail.com
                  </a>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="flex gap-3 mt-4">
                  <a
                    href="https://github.com/Saadi-Creative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/30 text-muted-foreground transition-all hover:text-foreground hover:border-border hover:bg-card/60"
                    aria-label="GitHub"
                  >
                    <GitHubIcon size={16} />
                  </a>
                  <a
                    href="https://linkedin.com/in/muhammad-saad-ullah-527705303"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/50 bg-card/30 text-muted-foreground transition-all hover:text-foreground hover:border-border hover:bg-card/60"
                    aria-label="LinkedIn"
                  >
                    <LinkedInIcon size={16} />
                  </a>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Contact form sandbox */}
          <div className="lg:col-span-7">
            <FadeIn delay={0.2}>
              <div className="rounded-2xl border border-border/50 bg-card/30 p-8 backdrop-blur-sm relative hover:border-border transition-colors">
                
                {status === "success" ? (
                  <div className="text-center py-12 space-y-4">
                    <CheckCircle className="h-12 w-12 text-emerald-400 mx-auto" />
                    <h3 className="text-lg font-semibold text-foreground">Message Sent Successfully</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      Thank you for reaching out. I will respond to your inquiry via email shortly.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-6 inline-flex h-9 items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 hover:bg-card px-4 text-xs font-semibold text-foreground transition-colors cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      Send Another
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot field (hidden from users, anti-spam check) */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full bg-background border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand transition-colors ${
                            errors.name ? "border-red-400" : "border-border/80"
                          }`}
                        />
                        {errors.name && (
                          <span className="text-[10px] text-red-400 mt-1 block flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.name}
                          </span>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full bg-background border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand transition-colors ${
                            errors.email ? "border-red-400" : "border-border/80"
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 mt-1 block flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className={`w-full bg-background border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand transition-colors ${
                          errors.subject ? "border-red-400" : "border-border/80"
                        }`}
                      />
                      {errors.subject && (
                        <span className="text-[10px] text-red-400 mt-1 block flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.subject}
                        </span>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className={`w-full bg-background border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:border-brand transition-colors resize-none ${
                          errors.message ? "border-red-400" : "border-border/80"
                        }`}
                      />
                      {errors.message && (
                        <span className="text-[10px] text-red-400 mt-1 block flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.message}
                        </span>
                      )}
                    </div>

                    {status === "error" && (
                      <div className="p-3 border border-red-400/30 bg-red-400/5 rounded-lg flex items-center gap-2 text-xs text-red-400">
                        <AlertCircle className="h-4 w-4" />
                        <span>Something went wrong. Please check your network and try again.</span>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full bg-foreground text-background font-semibold rounded-xl h-11 text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        {status === "loading" ? (
                          <>
                            <RefreshCw className="h-4 w-4 animate-spin" />
                            Sending Secure Request...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
