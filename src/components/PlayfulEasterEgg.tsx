"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Gamepad2, Coins, Flame } from "lucide-react";
import { sound } from "@/lib/sound";

export function PlayfulEasterEgg() {
  const [coins, setCoins] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const handleCoinClick = (e: React.MouseEvent) => {
    const nextCoins = coins + 1;
    setCoins(nextCoins);
    sound.playCoin();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 45,
      origin: { x, y },
      colors: ["#f59e0b", "#ff5733", "#10b981"],
    });

    if (nextCoins === 5) {
      sound.playPowerUp();
      setToastMsg("🎉 Level Up! 5 Joy Coins collected!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } else if (nextCoins === 10) {
      sound.playPowerUp();
      setToastMsg("🏆 Master Gamer! 10 Joy Coins!");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3500);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 pointer-events-none">
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="px-4 py-2 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-display font-bold shadow-craft pointer-events-auto flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-400 fill-current" />
            <span>{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.9 }}
        onClick={handleCoinClick}
        type="button"
        title="Click for Joy Coins!"
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-stone-950 font-display font-bold text-xs shadow-craft hover:shadow-craft-hover border-2 border-amber-600 cursor-pointer select-none transition-all"
      >
        <span className="text-base animate-bounce-subtle">🪙</span>
        <span>{coins > 0 ? `${coins} Coins` : "Coin?"}</span>
      </motion.button>
    </div>
  );
}