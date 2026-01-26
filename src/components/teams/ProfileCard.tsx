import { useState, useEffect } from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { IoSparkles, IoMusicalNotes, IoDisc } from "react-icons/io5";
import { motion } from "framer-motion";

type ProfileCardProps = {
  name: string;
  role?: string;
  dept?: string;
  year?: number;
  tagline?: string;
  contactEmail?: string;
  instagram?: string;
  linkedin?: string;
  github?: string;
  image: string;
};

const ProfileCard = ({
  name,
  role,
  dept,
  year,
  tagline,
  contactEmail,
  instagram,
  linkedin,
  github,
  image,
}: ProfileCardProps) => {
  // Badge Logic
  const [badgeIcon, setBadgeIcon] = useState<React.ReactNode>(null);
  useEffect(() => {
    // Randomly assigns one of these 3 icons to the user on mount
    const icons = [<IoSparkles key="1" />, <IoMusicalNotes key="2" />, <IoDisc key="3" />];
    setBadgeIcon(icons[Math.floor(Math.random() * icons.length)]);
  }, []);

  const numberToRoman = (num: number) => {
    const romanNumerals: { [key: number]: string } = { 1: "I", 2: "II", 3: "III", 4: "IV", 5: "V" };
    return romanNumerals[num] || String(num || "");
  };

  const details = year ? `B.Tech ${dept || ""} ${numberToRoman(year)} Year` : (dept ?? "");

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative w-full max-w-[320px] aspect-[1/1.5] rounded-3xl bg-[#140a29]/95 border border-[#2de2e6]/20 overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,79,216,0.18)]"
    >
      <div className="absolute inset-0 bg-linear-to-b from-[#ff4fd8]/0 via-[#ff4fd8]/6 to-[#2de2e6]/6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="absolute top-1/4 right-1/4 size-32 opacity-[0.08] pointer-events-none">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_20%,rgba(255,255,255,0.12)_22%,transparent_24%,transparent_40%,rgba(255,255,255,0.08)_42%,transparent_44%,transparent_60%,rgba(255,255,255,0.06)_62%,transparent_64%)]" />
        <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(255,79,216,0.15),rgba(45,226,230,0.15),rgba(255,122,24,0.15),rgba(255,79,216,0.15))]" />
      </div>

      {/* Scanlines overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
        }}
      />

      <div className="absolute -top-20 -right-20 size-52 bg-[#ff4fd8]/20 blur-3xl rounded-full opacity-60" />
      <div className="absolute -bottom-20 -left-20 size-56 bg-[#2de2e6]/15 blur-3xl rounded-full opacity-60" />

      {/* Colorful pixel accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex opacity-40 pointer-events-none">
        <div className="flex-1 bg-[#ff4fd8]" />
        <div className="flex-1 bg-[#2de2e6]" />
        <div className="flex-1 bg-[#ff7a18]" />
        <div className="flex-1 bg-[#b25cff]" />
        <div className="flex-1 bg-[#ffcc33]" />
        <div className="flex-1 bg-[#ff4fd8]" />
        <div className="flex-1 bg-[#2de2e6]" />
        <div className="flex-1 bg-[#ff7a18]" />
      </div>

      <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ff4fd8] rounded-tl-3xl opacity-80 z-20 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#2de2e6] rounded-br-3xl opacity-80 z-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-2 h-2 bg-[#ff7a18] rounded-full mt-3 mr-3 shadow-[0_0_12px_#ff7a18] animate-pulse z-20 pointer-events-none" />

      <div className="absolute inset-0 p-3 flex flex-col items-center">
        
        <div className="absolute top-5 left-5 z-30 flex gap-1">
                <div className="w-1 h-4 bg-[#2de2e6] rounded-full shadow-[0_0_10px_#2de2e6]" />
                <div className="w-1 h-3 bg-[#ff4fd8]/60 rounded-full mt-1" />
        </div>

           <div className="absolute top-5 right-5 z-30 text-[#ff4fd8] text-xl drop-shadow-[0_0_12px_rgba(255,79,216,0.75)] opacity-90">
            {badgeIcon}
        </div>

        {/* Image Frame */}
        <div className="w-full h-[72%] rounded-[20px] overflow-hidden relative shadow-2xl border border-[#2de2e6]/10 group-hover:border-[#2de2e6]/35 transition-colors duration-500 bg-[#0a0614]">
            <img 
                src={image} 
                alt={name}
                className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-90 contrast-110 group-hover:brightness-100 group-hover:scale-105"
            />
            
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-[#0a0614] to-transparent mix-blend-multiply opacity-80" />
            
            <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        </div>

        {/* Info Section */}
        <div className="flex-1 w-full flex flex-col items-center justify-end relative pb-4 z-10">
             <h3 
               className="text-white font-bold text-xl text-center uppercase tracking-tight leading-none mb-2 group-hover:text-[#ff4fd8] transition-colors duration-300"
                style={{ textShadow: "0 4px 20px rgba(0,0,0,0.8)" }}
             >
                {name}
             </h3>
             
             <div className="w-12 h-0.5 bg-linear-to-r from-[#ff4fd8] to-[#2de2e6] rounded-full shadow-[0_0_12px_rgba(45,226,230,0.45)] mb-3 opacity-60 group-hover:opacity-100 transition-opacity" />
             
             <div className="relative flex flex-col items-center gap-1 min-h-9">
                {/* Default: role + dept */}
                <div className="flex flex-col items-center gap-1 transition-opacity duration-300 group-hover:opacity-0">
                  <p className="text-[#ff7a18] text-xs font-extrabold uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,122,24,0.25)] text-center">{role}</p>
                  <p className="text-gray-300/70 text-[10px] tracking-[0.2em] font-mono text-center">{details}</p>
                </div>

                {/* Hover: tagline */}
                {tagline && (
                  <p className="absolute inset-0 flex items-center justify-center text-white/85 text-xs text-center max-w-[28ch] leading-snug italic opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    "{tagline}"
                  </p>
                )}
             </div>
        </div>
      </div>

      {/* Socials */}
      <div className="absolute inset-0 flex items-end justify-center pb-24 opacity-0 group-hover:pb-32 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-50">
          <div className="flex gap-4 bg-black/70 px-4 py-2 rounded-full backdrop-blur-md border border-[#ff4fd8]/25 pointer-events-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-[0_0_25px_rgba(255,79,216,0.12)]">
            {linkedin && (
            <a href={linkedin} target="_blank" rel="noreferrer" className="text-white hover:text-[#00d9ff] hover:scale-110 transition-all p-1">
                    <FaLinkedin size={18} />
                </a>
            )}
            {instagram && instagram !== "-" && (
            <a href={instagram} target="_blank" rel="noreferrer" className="text-white hover:text-[#ff4fd8] hover:scale-110 transition-all p-1">
                    <FaInstagram size={18} />
                </a>
            )}
            {contactEmail && (
            <a href={`mailto:${contactEmail}`} className="text-white hover:text-[#ffa726] hover:scale-110 transition-all p-1">
                    <FaEnvelope size={18} />
                </a>
            )}
            {github && (
            <a href={github} target="_blank" rel="noreferrer" className="text-white hover:text-[#b25cff] hover:scale-110 transition-all p-1">
                    <FaGithub size={18} />
                </a>
            )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
