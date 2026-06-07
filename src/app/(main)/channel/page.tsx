"use client";
import ChannelCard from "@/src/components/channel/ChannelCard";
import StatsCard from "@/src/components/channel/StatsCard";
import Button from "@/src/components/ui/Button";
import { getChannelList } from "@/src/redux/actions/channels.actions";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectChannelState } from "@/src/redux/slices/channelSlice";
import { useEffect, useState } from "react";
import type { ChannelInterface, ChannelList } from "@/src/types/channel";
import Spinner from "@/src/components/ui/Spinner";

const ChannelsPage = () => {
  const { channels, loading } = useAppSelector(selectChannelState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchMyChannels = async () => {
      await dispatch(getChannelList());
    };
    fetchMyChannels();
  }, []);

  return (
    <div className="m-auto">
      {/* <div className="grid grid-cols-4 gap-10 mb-10">
        <StatsCard
          label="Total Subscribers"
          value="2.4M"
          deltaType="positive"
          delta="↑ +12.4% this month"
        />
      </div> */}

      <div className="flex justify-between items-center mb-8 text-lg">
        <div className="font-mono">Your Channels</div>
        <div className="flex gap-4">
          <Button
            varient="transparent"
            className="py-1"
            icon="Plus"
            navigate="/channel/create"
          >
            Create
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          <div><Spinner/></div>
        ) : channels.length === 0 ? (
          <div>No channels yet</div>
        ) : (
          channels.map((ch) => (
            <ChannelCard
              key={ch._id ?? ch.id}
              name={ch.name}
              channelAvatar={ch.avatar ?? "./vercel.svg"}
              handle={ch.handle ?? "@vercel"}
              metrics={[
                { value: "84K", label: "Followers" },
                { value: "12K", label: "Avg viewers" },
                { value: "210", label: "Hours live" },
              ]}
              status={"live"}
              statusText={ch.statusText ?? "1 video live now"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelsPage;
