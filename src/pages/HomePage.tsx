import About from "../components/landing/About";
import Hero from "../components/landing/Hero";
import Milestone from "../components/landing/Milestone";
import Story from "../components/landing/Story";
import Values from "../components/landing/Values";
import WhyStatement from "../components/landing/WhyStatement";
import WhyUs from "../components/landing/WhyUs";

const HomePage = () => {
	return (
		<main>
			<Hero />
			<About />
			<Story />
			<WhyStatement />
			<Milestone />
			<Values />
			<WhyUs />
		</main>
	);
};

export default HomePage;
