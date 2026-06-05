"use client";
import Avatar from "@/src/components/ui/Avatar";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { checkHandleUnique } from "@/src/features/channels/channels.actions";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const ChannelZodSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  handle: z.string().min(3, "Handle must be at least 3 characters"),
});

const page = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [isHandleCorrect, setIsHandleCorrect] = useState<Boolean>(false);
  const [debouncedHandleValue, setDebouncedHandleValue] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<{
    channel: string;
    handle: string;
  }>({
    channel: "",
    handle: "",
  });


  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      e.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };


  const handleSubmit = () => {
    const result = ChannelZodSchema.safeParse({
      name: channelData?.channel,
      handle: channelData?.handle,
    });

    if (!result.success) {
      const message = result.error.issues.reduce((acc, issue) => {
        return { ...acc, [issue?.path?.[0]]: issue?.message };
      }, {});
      setError(message);
      return;
    }

    //handle submit

    setChannelData({channel: '', handle: ''})
    setDebouncedHandleValue(null)
    setIsHandleCorrect(false)
    setAvatarPreview(null)
    setError(null);
  };


  const isHandleUnique = async (handle: string | null) => {
    if(!handle) return;
    
    const res = await checkHandleUnique(handle);
    
    if (res?.success) {
      setIsHandleCorrect(true);
      return true;
    } else {
      setIsHandleCorrect(false);
      return false;
    }
  };


  const handleSlugFormation = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (value.startsWith("@")) {
      value = value.slice(1);
    }

    setChannelData((prev) => ({
      ...prev,
      handle: value,
    }));

    setIsHandleCorrect(false);
    setError(null);
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedHandleValue(channelData?.handle);
    }, 300);

    return () => clearTimeout(timer);
  }, [channelData?.handle]);


  useEffect(()=>{
    isHandleUnique(debouncedHandleValue);
  }, [debouncedHandleValue])

  return (
    <div>
      <div className="mb-5">
        <Button
          varient={"transparent"}
          className="p-2 pr-5 pl-4"
          icon="ArrowLeft"
          navigate="/channel"
        >
          Back
        </Button>
      </div>

      <div className="bg-(--surface-muted) p-8 rounded-3xl sm:w-full md:w-2xl m-auto border border-(--border-fade)">
        <h1 className="text-xl">Create new channel</h1>

        <div className="flex flex-col justify-center w-full items-center gap-5 p-10 pt-8 px-20">
          <Avatar
            src={avatarPreview}
            width={150}
            height={150}
            className="text-7xl"
          />
          <input
            onChange={handleFileSelect}
            id="select-avatar"
            accept="image/*"
            className={"hidden"}
            type="file"
          />
          <label htmlFor="select-avatar" className="cursor-pointer">
            Select
          </label>

          <div className="flex flex-col w-full gap-5">
            <div>
              <Input
                value={channelData?.channel}
                onChange={(e) => {
                  setChannelData((prev) => ({
                    ...prev,
                    channel: e.target.value,
                  }));
                  setError(null);
                }}
                name="name"
                placeholder="Name"
                className="py-3 w-full"
              />
              {error?.name ? (
                <p className="text-sm text-red-500">{error?.name}</p>
              ) : null}
            </div>
            <div>
              <Input
                value={channelData?.handle}
                onChange={handleSlugFormation}
                prefix="@"
                name="handle"
                placeholder="Handle"
                className="py-3"
              />
              {error?.handle ? (
                <p className="text-sm text-red-500">{error?.handle}</p>
              ) : (
                <p
                  className={`${isHandleCorrect ? "text-emerald-500" : "text-rose-500"}`}
                >
                  {channelData?.handle ? "@" + channelData?.handle : ""}
                </p>
              )}
            </div>
          </div>

          <p className="mt-2 text-(--muted) text-sm">
            You can change you channels' handle after 30 days from creation.
            Handle can used to uniquely identify you channel.
          </p>
        </div>

        <div className="flex justify-end">
          <Button className="p-2 px-5" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
