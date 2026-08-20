"use client";
import Image from "next/image";
import FreqPlayerList from "./components/start/FreqPlayerList";
import PatreonPlayerList from "./components/start/PatreonPlayerList";
import { Tooltip } from "@mui/material";
import { CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import Head from "next/head";
import WebsiteVersion from "./components/WebsiteVersion";
import PlayerCount from "./components/PlayerCount";
import DailyPlayerCount from "./components/DailyPlayerCount";
import CustomWeeklyLeaderboard from "./components/leaderboards/CustomWeeklyLeaderboard";

export default function Home() {
    return (
        <div className="flex h-fit flex-col bg-main w-full rounded-xl">
            <Head>
                <title>SkyWarsTools</title>
            </Head>
            <div className="w-full flex flex-col lg:flex-row items-center justify-between h-fit p-5 lg:p-8">
                <div className="flex flex-col gap-2 lg:gap-4 w-full lg:w-10/12">
                    <h1 className="text-5xl font-semibold text-center lg:text-left ">Welcome</h1>
                    <p className="font-semibold text-center lg:text-left text-base hidden lg:block">
                        Hypixel SkyWars Statistics, Leaderboards, Session Tracking and more! <br></br>Each time a player is searched, their
                        stats are retrieved from the Hypixel API and stored in our database. This allows us to provide insights into player
                        performance, track progress over time and much more!
                    </p>
                    <p className="lg:text-base text-sm text-center lg:text-left hidden lg:block">
                        Created by: <i className="font-semibold">Luka // LifelessNerd</i>, with help from amazing contributors:{" "}
                        <i className="font-semibold">Forums, SMED & abald</i>
                    </p>
                    <p className="lg:text-base text-sm text-center lg:text-left lg:hidden block">
                        Created by: <i className="font-semibold">Luka // LifelessNerd</i>
                        <br></br>Contributors: <i className="font-semibold">Forums, SMED & abald</i>
                    </p>
                </div>
                <Image className={"hidden lg:block"} src={"/logo.png"} alt={"SkyWarsTools title logo"} width={150} height={60}></Image>
            </div>

            <div className="rounded-lg px-4 lg:px-8 font-semibold flex flex-col lg:flex-row gap-2 lg:gap-4 mb-4 "> 
                <Link
                    href="/about"
                    className="w-full lg:w-[50%] h-20 bg-content rounded-xl p-3 lg:text-lg flex-row gap-2 justify-between items-center flex animate-press border-2 border-[#ffffff22]"
                >
                    <p className="w-[80%]">Confused? Read about all features here!</p>
                    <CircleQuestionMark className="w-14 h-14"></CircleQuestionMark>
                </Link>

                <Link
                    href="/patreon"
                    className="w-full lg:w-[50%] h-20 bg-content rounded-xl p-3 lg:text-lg flex-row gap-2 justify-between items-center flex animate-press border-2 border-[#ffffff22] enchanted"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="w-[80%]">Support the project on Patreon for special perks!</p>
                    <Image src="/icons/patreon.png" alt="Patreon" width={50} height={50} />
                </Link>

                <Link
                    href="/discord"
                    className="w-full lg:w-[50%] h-20 bg-content rounded-xl p-3 lg:text-lg flex-row gap-2 justify-between items-center flex animate-press border-2 border-[#ffffff22]"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <p className="w-[80%]">Join the Discord to report bugs and suggest features!</p>
                    <Image src="/icons/discord.png" alt="Patreon" width={50} height={50} />
                </Link>
            </div>

            <div className="flex flex-col gap-4">
                <div className="rounded-lg px-4 lg:px-8">
                    <h2 className="text-2xl font-bold mb-1 flex flex-row gap-4">
                        Patreon Supporters
                        <Tooltip title="Subscribe to Patreon to get an emoji and a spot right here!">
                            <CircleQuestionMark className="cursor-help" />
                        </Tooltip>
                    </h2>
                    <PatreonPlayerList></PatreonPlayerList>
                </div>

                <div className="rounded-lg px-4 lg:px-8">
                    <h2 className="text-2xl font-bold mb-1 flex flex-row gap-4">
                        Popular Players
                        <Tooltip title="Based on the amount of times Hypixel Stats had to be retrieved for a player">
                            <CircleQuestionMark className="cursor-help" />
                        </Tooltip>
                    </h2>
                    <FreqPlayerList></FreqPlayerList>
                </div>

                <div className="rounded-lg px-4 py-2 lg:px-8">
                    <CustomWeeklyLeaderboard></CustomWeeklyLeaderboard>
                </div>

                <div className="rounded-lg px-4 lg:px-8">
                    <h2 className="text-2xl font-bold mb-1 flex flex-row gap-4">SkyWars Statistics</h2>
                    <div className="flex flex-col lg:flex-row gap-4">
                        <PlayerCount></PlayerCount>
                        <DailyPlayerCount></DailyPlayerCount>
                    </div>
                </div>

                <div className="flex flex-row justify-between px-4 lg:px-8 py-2 text-gray-500 font-bold">
                    <span>This website is not affiliated, connected to or run by Hypixel, Mojang or Microsoft.</span>
                    <WebsiteVersion></WebsiteVersion>
                </div>
            </div>
        </div>
    );
}
