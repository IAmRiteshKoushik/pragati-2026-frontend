import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaultyTerminal from "./FaultyTerminal";

const aboutSections = [
	{
		title: "About ASB",
		content: `Amrita School of Business (ASB), Coimbatore is an elite management institution with a legacy of 30 years. The institution is accredited with AACSB (Association to Advance Collegiate Schools of Business), recognized to be top 5% of business schools around the world. It is also placed 26th in the NIRF Management Institution ranking (2025). With a unique blend of academic excellence and human values, ASB encapsulates in the philosophy "Education for life and Education for living". Here, students can pursue specializations in Marketing, Finance, Operations, Business Analytics, and HR. Career opportunities are plenty with the institution's strong industry ties, consistently achieving a near 100% placement. Success of ASB is reflected in our graduates who shine in pivotal roles at industry titans such as Google, Amazon, Microsoft, and EY, among other Fortune 500 giants. Beyond classroom, student-led committees and clubs, business research projects and rural out-reach initiatives shape graduates into industry ready global leaders. Backed by Principles of Responsible Management Education (PRME), ASB is also in the forefront of blending sustainability principles into modern day management competency building.`,
	},
	{
		title: "About PRAGATI",
		content: `PRAGATI is the flagship annual B-fest hosted by the students of Amrita School of Business, where theory meets practice through intense business-themed competitions across the domains of marketing, finance, HR, operations, and analytics. With PRAGATI'25 successfully amassing 400+ contestants for the prize pool of 4 Lakh Rupees, this year, PRAGATI'26 travels back to move forward. We celebrate the timeless glow of businesses that shaped our economy, under the theme - Radiance. It's a tribute to the leaders that redefined the future of India. PRAGATI isn't just a competition, it is also a networking hub. A constellation of CEOs and industry experts from in and around India visit the event, to inculcate their visionary insights and global perspectives. We take immense pride in having the global financial services leader BNY as our title sponsor, this partnership embarks a significant milestone in our journey. This is a student-executed event, every detail is a reflection of the professional learning at Amrita School of Business. Witness the perfect harmony of professional grit and retro flair, where every challenge is an opportunity to shine and every moment is a step toward your own radiance.`,
	},
	{
		title: "About Amrita Vishwa Vidyapeetham",
		content: `Amrita Vishwa Vidyapeetham is a multi-disciplinary, research-centered university that stands as a beacon of world-class education in India. Ranked as the 8 best university in India by NIRF and awarded an A++ by NAAC, Amrita is driven by the visionary guidance of its Chancellor, Sri Mata Amritanandamayi Devi (Amma). The institute is guided by the philosophy of "Education for Life and Education for Living," the university fosters a unique ecosystem where academic rigor meets compassion and social responsibility. This commitment to societal well-being is reflected in its pioneering initiatives like Live-in-Labs, Technology Business Incubator (TBI), AmritaRITE, Jivamritam, Saukhyam and many more. With over 250+ programs across 10 sprawling campuses, Amrita continues to pioneer global standards in research, innovation, and holistic development.`,
	},
];

interface AboutSectionProps {
	title: string;
	content: string;
	isFirst?: boolean;
}

const AboutSection = ({ title, content, isFirst = false }: AboutSectionProps) => {
	const containerRef = useRef<HTMLDivElement>(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end end"],
	});

	// Computer scale: grows from 1 to 3 as user scrolls (0% to 40% of scroll)
	const computerScale = useTransform(scrollYProgress, [0, 0.4], [1, 3]);

	// Black overlay opacity: fades in from 0 to 1 (20% to 50% of scroll)
	const blackOverlayOpacity = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);

	// About text opacity: fades in (50% to 60%) and fades out (85% to 100%)
	const aboutTextOpacity = useTransform(
		scrollYProgress,
		[0.5, 0.6, 0.85, 1],
		[0, 1, 1, 0],
	);

	// About text Y position: slides up as it appears
	const aboutTextY = useTransform(scrollYProgress, [0.5, 0.65], [50, 0]);

	return (
		<div ref={containerRef} className="relative h-[200vh]">
			{/* Sticky container that stays in view during scroll */}
			<div className="sticky top-0 w-screen h-screen overflow-hidden">
				{/* Background scene */}
				<section className="relative w-full h-full bg-black bg-[url(about/bg.webp)] bg-cover bg-no-repeat bg-center overflow-hidden">
					{/* Computer container with scale animation */}
					{isFirst && (
						<motion.div
							className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[400px] lg:w-[1100px] origin-center"
							style={{ scale: computerScale }}
						>
							{/* Computer image */}
							<img
								src="/about/comp.webp"
								alt="Retro computer"
								className="w-full h-auto"
							/>
							{/* "About us" text on the screen */}
							<div className="absolute top-[12%] left-[15%] w-[70%] h-[40%] flex items-center justify-center">
								<span
									className="text-white text-2xl md:text-3xl lg:text-6xl font-bold tracking-wider font-jersey15"
									style={{
										textShadow:
											"-2px -2px 0px #ff0000, 2px 2px 0px #00ffff",
									}}
								>
									About Us
								</span>
							</div>
						</motion.div>
					)}

					{/* FaultyTerminal background overlay */}
					<motion.div
						className="absolute inset-0 pointer-events-none"
						style={{ opacity: isFirst ? blackOverlayOpacity : 1 }}
					>
						<FaultyTerminal
							scale={2.0}
							gridMul={[2, 1]}
							digitSize={2.6}
							timeScale={0.5}
							pause={false}
							scanlineIntensity={0.5}
							glitchAmount={1}
							flickerAmount={1}
							noiseAmp={1}
							chromaticAberration={0}
							dither={0}
							curvature={0.5}
							tint="#ffffff"
							mouseReact
							mouseStrength={0.5}
							pageLoadAnimation
							brightness={0.5}
							backgroundColor="#361c67"
						/>
					</motion.div>

					{/* About Us text content */}
					<motion.div
						className="absolute inset-0 flex items-center justify-center px-8 md:px-16 lg:px-32"
						style={{ opacity: aboutTextOpacity, y: aboutTextY }}
					>
						<div className="max-w-4xl text-center bg-black/50 backdrop-blur-[4px] backdrop-saturate-200 rounded-3xl p-5 border border-[#00ffff]">
							<h2
								className="text-3xl text-white md:text-4xl lg:text-6xl font-bold text-green-400 mb-8 font-jersey15"
								style={{
									textShadow:
										"-2px -2px 0px #ff0000, 2px 2px 0px #00ffff",
								}}
							>
								{title}
							</h2>
							<p className="text-gray-300 text-balance md:text-lg lg:text-xl leading-relaxed font-jersey15">
								{content}
							</p>
						</div>
					</motion.div>
				</section>
			</div>
		</div>
	);
};

const About = () => {
	return (
		<>
			{aboutSections.map((section, index) => (
				<AboutSection
					key={section.title}
					title={section.title}
					content={section.content}
					isFirst={index === 0}
				/>
			))}
		</>
	);
};

export default About;
