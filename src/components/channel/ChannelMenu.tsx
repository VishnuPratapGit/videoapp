"use client";
import React from "react";
import Menu, { option } from "../ui/Menu";
import { deleteChannel } from "@/src/features/channels/channel.actions";

interface ChannelMenuProps {
  id: string;
  children: React.ReactNode;
}

export default function ChannelMenu({ id, children }: ChannelMenuProps) {
  const menuOptions: option[] = [
    { name: "Delete Channel", action: async () => await deleteChannel(id) },
  ];

  return <Menu options={menuOptions}>{children}</Menu>;
}
