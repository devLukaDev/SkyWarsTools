"use client";
import { GuildResponse } from "@/app/types/GuildResponse";


type GuildMemberListProps = {
  guildData: GuildResponse
}

const GuildMemberList = ({ guildData }: GuildMemberListProps) => {
  return (
    <div>
        {guildData.guild.members.forEach() => {}}
    </div>
  )
}

export default GuildMemberList