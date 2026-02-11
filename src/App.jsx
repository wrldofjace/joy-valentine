import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const audioRef = useRef(null);

  // REPLACE THIS with your actual phone number (include country code, no + or spaces)
  const MY_PHONE_NUMBER = "2547XXXXXXXX"; 

  useEffect(() => {
    const target = new Date("February 14, 2026 00:00:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      setTimeLeft({
        days: Math.max(0, Math.floor(distance / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))),
        minutes: Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))),
        seconds: Math.max(0, Math.floor((distance % (1000 * 60)) / 1000)),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * (window.innerWidth - 150) - (window.innerWidth / 2) + 75;
    const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2) + 50;
    setNoButtonPos({ x, y });
    setNoCount(noCount + 1);
  };

  const handleYesClick = () => {
    setYesPressed(true);
    if (audioRef.current) audioRef.current.play();
    const end = Date.now() + 15000;
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff4d6d', '#ffffff'] });
      confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff4d6d', '#ffffff'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  return (
    <div className="relative flex items-center justify-end h-screen w-full overflow-hidden font-sans pr-4 md:pr-20">
      <Analytics />
      <audio ref={audioRef} src="/music.mp3" loop />
      
      <div 
        className="absolute inset-0 z-0 bg-no-repeat bg-cover bg-[left_top]"
        style={{ backgroundImage: "url('/joy.png')" }}
      />
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-transparent via-black/20 to-black/60" />

      {!yesPressed && (
        <motion.div 
          initial={{ y: -100 }} animate={{ y: 0 }}
          className="absolute top-0 left-0 w-full z-40 py-6 bg-gradient-to-b from-black/60 to-transparent flex justify-center items-center"
        >
          <h1 className="text-white font-black uppercase tracking-[0.8em] text-xl md:text-2xl drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            Jace Forever
          </h1>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {yesPressed ? (
          <motion.div 
            key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 flex flex-col p-8 rounded-[2rem] bg-black/70 backdrop-blur-3xl border border-white/20 shadow-2xl max-w-md max-h-[85vh] overflow-y-auto"
          >
            <div className="flex flex-col items-center text-center">
                <img src="https://media.tenor.com/gUv1Ou897EAAAAAj/bear-kiss-bear-kisses.gif" className="w-32 mb-6 rounded-2xl" />
                <h2 className="text-rose-500 font-serif italic text-3xl mb-4 underline underline-offset-8 decoration-rose-500/30">From Jayson...</h2>
                
                <div className="space-y-6 text-white text-base leading-relaxed italic font-medium">
                    <p>"Others will keep lookin but I've already found, but you may find, but not find what I've found because what I've found."</p>
                    <p className="text-rose-400 font-extrabold not-italic text-lg">"Oh my ❤️ 🗣️ look at her."</p>
                    <p>"I wouldn't squander the greatest person that ever happened to my life and we've come a long way and i intend to even keep it a longer way."</p>
                    <p className="text-sm opacity-50 not-italic">"...though not as long as my ndugu here."</p>
                </div>
                
                <div className="mt-8 pt-6 border-t border-white/20 w-full font-black text-rose-500 uppercase tracking-[0.2em] text-xl animate-pulse">
                    I Love You Joy
                </div>

                {/* 💌 WHATSAPP NOTIFICATION BUTTON */}
              <button 
  onClick={() => window.location.href = `https://wa.me/${254790555800}`}
  className="mt-6 bg-green-500 hover:bg-green-400 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
>
  Tell Jayson YES! 💌
</button>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="question" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
            className="relative z-20 flex flex-col items-center p-8 md:p-12 rounded-[2.5rem] bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl w-full max-w-sm"
          >
            <div className="text-center mb-6">
              <h2 className="text-[#ff4d6d] font-serif text-3xl italic font-bold">Joy Ndanu</h2>
              <p className="text-white/60 text-[10px] uppercase tracking-widest mt-2 font-bold">February. The month of love... 🌹</p>
            </div>

            <h1 className="text-2xl font-light text-white mb-8 text-center leading-tight">
              Will you be my <br/> <span className="font-black text-rose-500 uppercase tracking-tighter text-5xl drop-shadow-lg">Valentine?</span>
            </h1>

            <div className="flex gap-4 mb-8 text-white">
              {['days', 'hours', 'minutes', 'seconds'].map((unit) => (
                <div key={unit} className="flex flex-col items-center min-w-[50px] bg-white/5 rounded-lg p-2 border border-white/5">
                  <span className="text-2xl font-black leading-none">{timeLeft[unit]}</span>
                  <span className="text-[7px] uppercase tracking-widest opacity-60 mt-2">{unit}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 w-full">
              <button
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-black py-4 rounded-2xl shadow-[0_5px_15px_rgba(225,29,72,0.4)] transition-all active:scale-95 text-lg"
                onClick={handleYesClick}
              >
                YES!
              </button>
              
              <motion.button
                animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                onMouseEnter={moveNoButton}
                onClick={moveNoButton}
                className="flex-1 bg-white/10 text-white/40 py-4 rounded-2xl border border-white/5 font-bold"
              >
                No
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}