import Image from "next/image";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string | null;
  height?: number;
  width?: number;
  calssName?: string;
}

const Avatar = ({
  name = "Avatar",
  src,
  height = 40,
  width = 40,
  className = "",
  ...props
}: AvatarProps) => {
  const [imageCrashed, setImageCrashed] = useState(false);
  
  const extractName: (name: string) => string = (name: string) => {
    if (!name) return "";
    const nameArr = name?.toUpperCase()?.split(" ");
    return (
      (nameArr?.[0] ? nameArr?.[0]?.charAt(0) : "") +
      (nameArr?.[1] ? nameArr[1]?.charAt(0) : "")
    );
  };

  return (
    <div
      className={twMerge(
        "border relative rounded-full cursor-pointer border-(--border-fade) flex items-center justify-center text-xl bg-(--surface-muted)",
        className,
      )}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      {extractName(name)}
      {!imageCrashed && src && (
        <Image
          alt=""
          src={src}
          fill
          sizes={`${width}px`}
          className="absolute rounded-full inset-0 z-30 object-cover"
          onError={() => setImageCrashed(true)}
        />
      )}
    </div>
  );
};

export default Avatar;
