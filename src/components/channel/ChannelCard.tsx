import Avatar from "../ui/Avatar";

type StatusType = "live" | "scheduled" | "idle";

interface ChannelMetric {
  value: string;
  label: string;
}

interface ChannelCardProps {
  name: string;
  channelAvatar: string;
  handle: string;
  status: StatusType;
  statusText: string;
  metrics: ChannelMetric[];
}

const statusConfig: Record<StatusType, { dotClass: string }> = {
  live: { dotClass: "bg-green-500" },
  scheduled: { dotClass: "bg-amber-400" },
  idle: { dotClass: "bg-slate-600" },
};

const ChannelCard = ({
  name,
  channelAvatar,
  handle,
  status,
  statusText,
  metrics,
}: ChannelCardProps) => {
  const statusDot = statusConfig[status];

  return (
    <div className="flex flex-col bg-(--surface-muted) rounded-xl border hover:scale-101 transition-all border-(--border-fade) hover:border-(--border) overflow-clip">
      {/* UPPER */}
      <div className="h-30 bg-(--background) relative">
        <div className="absolute bottom-0 left-5 translate-y-1/2">
          <Avatar name={name} src={channelAvatar} height={56} width={56} />
        </div>
      </div>

      {/* LOWER */}
      <div className="flex flex-col mt-8 px-6 py-3 gap-2">
        <div>
          <h1 className="text-lg font-semibold">{name}</h1>
          <div className="text-(--muted) text-sm">{handle}</div>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <span
            className={`w-2 h-2 rounded-full inline-block ${statusDot.dotClass}`}
          />
          <span className="text-xs text-(--muted)">{statusText}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="bg-(--background) border border-(--border-fade) rounded-lg px-2 py-2"
            >
              <p className="text-base font-bold">{m.value}</p>
              <p className="text-xs text-(--muted) mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelCard;
