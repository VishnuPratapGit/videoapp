'use client'

import { signOut, useSession } from "next-auth/react";
import Avatar from "./Avatar";
import Button from "./Button";
import Link from "next/link";
import Divider from "./Divider";
import { Icon } from "../icons/Icon";
import { useRouter } from "next/navigation";

interface MenuItemsType {
  icon: string;
  label: string;
  route: string;
}

const menuItems: MenuItemsType[] = [
  {
    icon: "CircleUserRound",
    label: "Profile",
    route: "/profile",
  },
  {
    icon: "Settings",
    label: "Settings",
    route: "/settings",
  },
];

const UserProfilePopover = () => {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <div className="min-w-68 rounded-2xl border border-(--border-fade) bg-(--surface-muted)">
      <div className="p-4">
        {data ? (
          <div className="flex gap-4 items-center">
            <Avatar
              name={data?.user?.name || ''}
              src={data?.user?.image || null}
              height={50}
              width={50}
            />
            <div>
              <div className="text-lg">{data?.user?.name}</div>
              <Link className="text-sm" href={"/profile"}>
                {data?.user?.email}
              </Link>
            </div>
          </div>
        ) : status === "loading" ? (
          <div>
            <Button className="py-2 w-full" disabled>
              Loading...
            </Button>
          </div>
        ) : (
          status === "unauthenticated" && (
            <Button
              className="py-2 w-full font-semibold"
              onClick={() => router.push("/auth/signin")}
            >
              Sign In
            </Button>
          )
        )}
      </div>

      <div className="w-full">
        <Divider />
      </div>

      <div className="py-2 flex flex-col">
        {menuItems?.map((item) => {
          return (
            <div
              onClick={() => router.push(item.route)}
              key={item?.label}
              className="flex gap-4 cursor-pointer hover:bg-(--surface-hover) p-3"
            >
              <div>
                <Icon icon={item.icon} />
              </div>
              <div>{item.label}</div>
            </div>
          );
        })}
      </div>

      <div className="w-full">
        <Divider />
      </div>

      {status === "authenticated" && (
        <div className="px-4 py-3">
          <Button className="py-2 w-full" onClick={() => signOut()}>
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProfilePopover;