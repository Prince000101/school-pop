"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BigButton from "@/components/BigButton";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

/**
 * "Install PopSchool!" prompt — uses beforeinstallprompt (Chrome/Android)
 * and falls back to a gentle iOS Add-to-Home-Screen hint. Hidden once the
 * app is running standalone or the prompt was accepted/dismissed.
 */
export function InstallButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [showIosHint, setShowIosHint] = useState(false);
  const [installed, setInstalled] = useState<boolean>(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia("(display-mode: standalone)").matches ||
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone)),
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);

    const onBip = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);
    window.addEventListener("beforeinstallprompt", onBip);
    window.addEventListener("appinstalled", onInstalled);

    const t = window.setTimeout(() => setShowIosHint(isIOS && !installed), 1500);

    return () => {
      window.removeEventListener("beforeinstallprompt", onBip);
      window.removeEventListener("appinstalled", onInstalled);
      window.clearTimeout(t);
    };
  }, [installed]);

  const canShow = !installed && !dismissed && (deferred || showIosHint);
  if (!canShow) return null;

  const install = async () => {
    if (deferred) {
      try {
        await deferred.prompt();
        const choice = await deferred.userChoice;
        if (choice.outcome === "accepted") setInstalled(true);
        else setDismissed(true);
      } catch {
        setDismissed(true);
      }
    } else {
      setDismissed(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="card-pop relative mt-6 flex max-w-sm flex-col items-center gap-2 px-5 py-4 text-center"
      >
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss install prompt"
          className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-sm font-bold text-white shadow-md transition hover:scale-110"
          style={{ background: "var(--color-pops-red)" }}
        >
          ✕
        </button>
        <span className="text-3xl">📲</span>
        <p className="text-base font-bold text-pops-ink">
          {deferred ? "Make PopSchool an app!" : "Play PopSchool from your home screen"}
        </p>
        <p className="text-sm font-semibold text-pops-ink/60">
          {deferred
            ? "Install it for quick, full-screen play — even offline!"
            : "Tap Share, then “Add to Home Screen”."}
        </p>
        {deferred && (
          <BigButton
            color="var(--color-pops-pink)"
            colorDeep="var(--color-pops-pinkd)"
            size="md"
            onClick={() => void install()}
          >
            Install PopSchool
          </BigButton>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
