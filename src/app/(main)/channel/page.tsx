import ChannelCard from "@/src/components/channel/ChannelCard";
import StatsCard from "@/src/components/channel/StatsCard";
import Button from "@/src/components/ui/Button";

const ChannelsPage = () => {
    return (
      <div className="w-[80%] m-auto">
        <div className="grid grid-cols-4 gap-10">
          <StatsCard
            label="Total Subscribers"
            value="2.4M"
            deltaType="positive"
            delta="↑ +12.4% this month"
          />
          <StatsCard
            label="Scheduled Post"
            value="2.4M"
            deltaType="negative"
            delta="↑ +12.4% this month"
          />
          <StatsCard
            label="Total Views"
            value="2.4M"
            deltaType="neutral"
            delta="↑ +12.4% this month"
          />
          <StatsCard
            label="Active Channels"
            value="2.4M"
            deltaType="positive"
            delta="↑ +12.4% this month"
          />
        </div>

        <div className="flex justify-between items-center my-10 mb-8 text-lg">
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

        <div className="grid grid-cols-3 gap-10">
          <ChannelCard
            name="varcel"
            channelAvatar="./vercel.svg"
            handle="@vercel"
            metrics={[
              { value: "84K", label: "Followers" },
              { value: "12K", label: "Avg viewers" },
              { value: "210", label: "Hours live" },
            ]}
            status="live"
            statusText="1 video live now"
          />
          <ChannelCard
            name="varcel"
            channelAvatar="./vercel.svg"
            handle="@vercel"
            metrics={[
              { value: "84K", label: "Followers" },
              { value: "12K", label: "Avg viewers" },
              { value: "210", label: "Hours live" },
            ]}
            status="live"
            statusText="1 video live now"
          />
          <ChannelCard
            name="varcel"
            channelAvatar="./vercel.svg"
            handle="@vercel"
            metrics={[
              { value: "84K", label: "Followers" },
              { value: "12K", label: "Avg viewers" },
              { value: "210", label: "Hours live" },
            ]}
            status="live"
            statusText="1 video live now"
          />
        </div>
      </div>
    );
}

export default ChannelsPage;