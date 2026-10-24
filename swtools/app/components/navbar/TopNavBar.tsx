import React from "react";
import Link from "next/link";
import NavDropdownMenu from "./NavDropdownMenu";
import NavBarProfile from "./NavBarProfile";
import PlayerInputField from "./PlayerInputField";
import Image from "next/image";
import ThemeToggle from "./ThemeToggle";

const TopNavBar = () => {
	const content = [
		{ name: "Tools", href: "/tools" },
		{ name: "Leaderboards", href: "/leaderboards" },
		{ name: "About", href: "/about" },
	];

	return (
		<>
			<nav className="bg-nav w-full h-full lg:h-18 flex justify-center space-between sticky top-0 z-50 shadow-lg">
				<div className="bg-nav h-full lg:h-18 w-[100vw] lg:w-[1150px] items-center justify-start flex-row lg:flex gap-4">
					<div className="flex items-center justify-start gap-1 lg:gap-4 order-0">
						<Link className="p-2 animate-press flex flex-row gap-2 justify-center items-center" href="/">
							<Image src="/logo.webp" alt="Logo" height={50} width={50} className="w-[40px] lg:w-[50px]" />
							<p className="hidden lg:inline font-semibold text-2xl">SkyWarsTools</p>
						</Link>
						<PlayerInputField />
						<NavBarProfile mobile={true} alignRight={false} />
					</div>

					<div className="flex items-center justify-center lg:justify-start gap-2 lg:gap-4">
						{content.map((item) => (
							<NavDropdownMenu key={item.name} label={item.name} href={item.href} />
						))}
					</div>
					<div className="hidden lg:flex items-center ml-auto gap-1">
						<ThemeToggle />
						<NavBarProfile alignRight={false} />
					</div>
				</div>
			</nav>
		</>
	);
};

export default TopNavBar;
