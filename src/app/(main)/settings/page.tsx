import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Image from "next/image";
import Avatar from "@/src/components/ui/Avatar";
import Link from "next/link";

const Settings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/auth/signin");
  }

  return (
    <div className="mx-auto max-w-[65%] px-4 py-10">
      <h1 className="text-xl font-mono">Account</h1>

      <div className="flex items-center border-b pb-10 border-(--border-fade)">
        <div className="flex-3">
          <h2 className="text-2xl font-sans font-bold">
            Choose how you appear and what you see on Blogger
          </h2>
          <p className="mt-2 text-(--muted)">
            Signed in as{" "}
            <span className="text-(--accent)">{session?.user?.email}</span>
          </p>
        </div>

        <div className="flex-1 min-h-35 relative">
          <Link
            className="block h-full w-full"
            target="_blank"
            href="https://storyset.com/people"
          >
            <Image
              src="/filesearch.svg"
              fill
              alt="Telescope"
              className="scale-150"
              title="Data illustrations by Storyset"
            />
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-mono mt-10">Your Blogger channel</h1>

        <p className="mt-2 text-(--muted)">
          This is your public presence on Blogger. You need a channel to upload
          your own content, comment on posts, or create playlists.
        </p>

        <div className="flex gap-10 py-5">
          <div>
            <Avatar
              height={200}
              width={200}
              name={session?.user?.name || "A"}
              src={session?.user?.image || ""}
            />
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="font-semibold text-xl">{session?.user?.name}</h2>
              <div className="text-(--muted)">{session?.user?.email}</div>
            </div>
            <div className="flex flex-col gap-1 text-(--accent)">
              <Link className="" href="/channel/create">
                Create a new channel
              </Link>
              <Link className="" href="/channels">
                Go to channels page
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
