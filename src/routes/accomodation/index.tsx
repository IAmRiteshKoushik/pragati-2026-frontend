import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import Noise from "@/components/sponsors/Noise";

export const Route = createFileRoute("/accomodation/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [gender, setGender] = useState<"male" | "female" | null>(null);
  const [accommodationType, setAccommodationType] = useState<
    "single" | "shared" | null
  >(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ gender, accommodationType });
  };

  return (
    <section className="bg-black w-screen h-screen max-sm:h-[110vh] overflow-scroll">
      <div className="relative z-10 w-full min-h-screen max-sm:h-[110vh] bg-black/50 backdrop-blur-[5px] backdrop-saturate-130 flex flex-col items-center gap-5 overflow-scroll">
        <Noise
          patternSize={50}
          patternScaleX={10}
          patternScaleY={10}
          patternRefreshInterval={2}
          patternAlpha={25}
        />

        <motion.h1
          initial={{ translateY: 120, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
          className="z-20 text-zinc-200 text-8xl mt-5 font-jersey
              text-shadow-[-2px_-2px_0px_var(--color-red-400),2px_2px_0px_var(--color-blue-400)] max-sm:text-6xl"
        >
          Accommodation
        </motion.h1>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative bg-black/50 flex flex-col justify-center items-center w-4/6 max-md:w-10/12 max-sm:w-11/12 backdrop-blur-2xl text-zinc-200 text-4xl font-jersey
              text-shadow-[2px_2px_0px_var(--color-blue-400)] py-10 border-3 border-purple-500 shadow-[0px_0px_10px_0px_var(--color-purple-500)]"
        >
          <Noise
            patternSize={50}
            patternScaleX={10}
            patternScaleY={10}
            patternRefreshInterval={2}
            patternAlpha={10}
          />

          <span className="absolute top-0 left-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
          <span className="absolute top-0 right-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
          <span className="absolute bottom-0 left-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
          <span className="absolute bottom-0 right-0 w-5 h-5 bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>

          <p className="text-center text-shadow-[2px_2px_0px_var(--color-blue-400)]">
            Choose your Accommodation preferences
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-8 w-full p-6 pb-2"
          >
            {/* Gender Selection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <span className="text-2xl text-shadow-[1px_1px_0px_var(--color-blue-400)]">
                Select Gender
              </span>
              <div className="flex gap-12 justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ${
                    gender === "male"
                      ? "scale-110 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] filter brightness-110"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                  onClick={() => setGender("male")}
                >
                  <img
                    src="/accomodation/male-avatar.png"
                    alt="Male"
                    className="w-28 h-28 object-contain"
                  />
                  <span className="text-xl tracking-wider">MALE</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`cursor-pointer flex flex-col items-center gap-2 transition-all duration-300 ${
                    gender === "female"
                      ? "scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] filter brightness-110"
                      : "opacity-60 hover:opacity-100 hover:scale-105"
                  }`}
                  onClick={() => setGender("female")}
                >
                  <img
                    src="/accomodation/female-avatar.png"
                    alt="Female"
                    className="w-28 h-28 object-contain"
                  />
                  <span className="text-xl tracking-wider">FEMALE</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Accommodation Type */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex flex-col items-center gap-4 w-full"
            >
              <span className="text-2xl">Select Type</span>
              <div className="flex gap-6 max-sm:flex-col items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setAccommodationType("single")}
                  className={`px-6 py-2 border-2 border-cyan-400 text-xl font-jersey tracking-wide transition-all duration-300 ${
                    accommodationType === "single"
                      ? "bg-cyan-400 text-black shadow-[0_0_15px_#22d3ee] scale-105"
                      : "text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee66]"
                  }`}
                >
                  Single Occupancy
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setAccommodationType("shared")}
                  className={`px-6 py-2 border-2 border-cyan-400 text-xl font-jersey tracking-wide transition-all duration-300 ${
                    accommodationType === "shared"
                      ? "bg-cyan-400 text-black shadow-[0_0_15px_#22d3ee] scale-105"
                      : "text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_10px_#22d3ee66]"
                  }`}
                >
                  4 Sharing
                </motion.button>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1, type: "spring" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={!gender || !accommodationType}
              className={`mt-4 px-10 py-3 text-2xl font-jersey tracking-wider border-2 transition-all duration-300 transform ${
                !gender || !accommodationType
                  ? "bg-gray-600 border-gray-500 text-gray-400 cursor-not-allowed opacity-50"
                  : "bg-purple-600 hover:bg-purple-500 text-white border-purple-400 shadow-[0_0_15px_var(--color-purple-500)] hover:shadow-[0_0_25px_var(--color-purple-400)]"
              }`}
            >
              PROCEED
            </motion.button>
          </form>
        </motion.div>
      </div>

      <video
        className="hidden lg:block fixed inset-0 z-0 w-screen h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="accomodation/bg.webm" type="video/webm" />
      </video>

      <video
        className="lg:hidden fixed inset-0 z-0 w-screen h-screen object-cover"
        autoPlay
        loop
        muted
      >
        <source src="accomodation/bg-small.webm" type="video/webm" />
      </video>
    </section>
  );
}
