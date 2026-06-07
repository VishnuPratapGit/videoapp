import ChannelCard from "@/src/components/channel/ChannelCard";
import Button from "@/src/components/ui/Button";
import { Channel, IChannel } from "@/src/models/Channels";
import { dbConnect } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export const ChannelsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login");
  }

  await dbConnect();

  const channels: IChannel[] = await Channel.find({
    userId: session?.user?.id,
  }).lean();

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

      <div className="subtle-scrollbar h-[calc(100vh-240px)] p-2 overflow-y-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {channels.length === 0 ? (
          <div>No channels yet</div>
        ) : (
          channels.map((ch) => (
            <ChannelCard
              key={ch._id.toString()}
              name={ch.name}
              channelAvatar={ch.avatar ?? "./vercel.svg"}
              handle={ch.handle ?? "@vercel"}
              metrics={[
                { value: "84K", label: "Followers" },
                { value: "12K", label: "Avg viewers" },
                { value: "210", label: "Hours live" },
              ]}
              status={"live"}
              statusText={"1 video live now"}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChannelsPage;
