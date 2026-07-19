import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "mc-heads.net",
				pathname: "/avatar/**",
			},
			{
				protocol: "https",
				hostname: "www.mc-heads.net",
				pathname: "/avatar/**",
			},
			{
				protocol: "https",
				hostname: "api.mcheads.org",
				pathname: "/head/**",
			},
			{
				protocol: "https",
				hostname: "starlightskins.lunareclipse.studio",
				pathname: "/render/ultimate/**",
			},
			{
				protocol: "https",
				hostname: "render.crafty.gg",
				pathname: "/3d/**/**",
			},
			{
				protocol: "https",
				hostname: "api.skywarstools.com",
				pathname: "/**",
			},
			{
				protocol: "http",
				hostname: "localhost",
				pathname: "/**",
			},
		],
		qualities: [10, 75, 85, 100],
	},
	allowedDevOrigins: ["localhost:3000", "http://localhost:3000, http://192.168.178.51, 192.168.178.51"],
};

export default nextConfig;
