import { motion } from "framer-motion";
import { IoDiscOutline } from "react-icons/io5";

export const RadianceLoader = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0614] flex flex-col items-center justify-center text-white z-50">
      <div className="relative">
        {/* Outer Glow Ring */}
        <motion.div
           animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 bg-linear-to-r from-[#ff4fd8]/25 via-[#ff7a18]/20 to-[#2de2e6]/25 blur-2xl rounded-full"
        />
        
        {/* Rotating Disc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <IoDiscOutline className="text-8xl text-[#2de2e6] drop-shadow-[0_0_18px_rgba(45,226,230,0.45)]" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <div className="mt-8 flex flex-col items-center gap-2">
        <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          className="font-black text-xl tracking-[0.3em] font-mono text-transparent bg-clip-text bg-linear-to-r from-[#ff4fd8] via-[#ff7a18] to-[#2de2e6]"
        >
            INITIALIZING
        </motion.span>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
            <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-full h-full bg-linear-to-r from-[#ff4fd8] via-[#ff7a18] to-[#2de2e6] shadow-[0_0_14px_rgba(255,79,216,0.35)]"
            />
        </div>
      </div>
    </div>
  );
};
