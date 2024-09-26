import { useRef, useEffect } from "react";
import useCompanyProfile from "../../hooks/useCompanyProfile";
import { scrollTo } from "../../utils/scrollTo";

const Hero = () => {
	const { data, error, isLoading } = useCompanyProfile();

	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = videoRef.current;
		if (video) {
			const handleVideoEnd = () => {
				video.currentTime = 0;
				video.play();
			};

			video.addEventListener("ended", handleVideoEnd);

			return () => {
				video.removeEventListener("ended", handleVideoEnd);
			};
		}
	}, [data]);

	if (error) throw new Error(error.message);

	if (isLoading) return "loading...";

	return (
		data && (
			<div id="home" className="h-screen relative">
				<div className="absolute w-full h-full inset-0">
					<video
						ref={videoRef}
						src={data.data.video_url}
						muted
						autoPlay
						className="object-cover w-full h-full"
					/>
				</div>
				<div className="w-full h-full absolute inset-0 z-10 bg-black/70 flex items-center justify-center">
					<div className="w-4/5 mt-10 md:mt-0">
						<h1 className="text-white text-5xl md:text-6xl lg:text-8xl font-bold max-w-md mb-10">
							{data.data.company_name}
						</h1>
						<button
							type="button"
							onClick={() => scrollTo("about")}
							className="focus:outline-none uppercase text-white bg-green-700 hover:bg-green-800 px-5 py-3 me-2 mt-5"
						>
							Explore more
						</button>
					</div>
				</div>
			</div>
		)
	);
};

export default Hero;
