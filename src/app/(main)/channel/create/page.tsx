"use client";
import Avatar from "@/src/components/ui/Avatar";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";
import { Toaster } from "@/src/components/ui/Toaster";
import {
  checkHandleUnique,
  createChannel,
} from "@/src/features/channels/channels.actions";
import useDebounce from "@/src/hooks/useDebounce";
import { useToast } from "@/src/hooks/useToast";
import { generateUniqueSlug } from "@/src/lib/generateSlug";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as z from "zod";

const ChannelZodSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  handle: z.string().min(3, "Handle must be at least 3 characters"),
});

const page = () => {
  const [channelData, setChannelData] = useState<{
    channel: string;
    handle: string;
  }>({
    channel: "",
    handle: "",
  });
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [error, setError] = useState<Record<string, string> | null>(null);
  const [isHandleCorrectAndUnique, setIsHandleCorrectAndUnique] = useState<Boolean>(false);
  const debouncedChannelValue = useDebounce(channelData.channel, 300);
  const debouncedHandleValue = useDebounce(channelData.handle, 300);
  const router = useRouter();
  const {toast, toasts, dismiss} = useToast();

  useEffect(() => {
    if (debouncedHandleValue) isHandleUnique(debouncedHandleValue);
  }, [debouncedHandleValue]);

  useEffect(() => {
    if (debouncedChannelValue) generateSlug();
  }, [debouncedChannelValue]);

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

  const isHandleUnique = async (handle: string | null) => {
    if (!handle) return;
    const res = await checkHandleUnique(handle); //@anything
    if (res?.success) {
      setIsHandleCorrectAndUnique(true);
      return true;
    } else {
      setIsHandleCorrectAndUnique(false);
      return false;
    }
  };

  const generateSlug = async () => {
    if (!channelData.channel) return;
    const suggestedHandle = await generateUniqueSlug(channelData.channel);
    if (suggestedHandle) {
      setChannelData((prev) => ({
        ...prev,
        handle: suggestedHandle,
      }));
    }
  };

  const createOwnHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if(!value.startsWith('@') && value?.length>0){
      value = '@'+value;
    }
    setIsHandleCorrectAndUnique(false);
    setError(null);
    setChannelData((prev) => ({
      ...prev,
      handle: value,
    }));
  };

  const handleSubmit = async () => {
    const { channel, handle } = channelData;

    if (!isHandleCorrectAndUnique) {
      setError((prev) => ({ ...prev, handle: "Handle Should be unique!" }));
      return;
    }

    const result = ChannelZodSchema.safeParse({
      name: channel,
      handle,
    });

    if (!result.success) {
      const message = result.error.issues.reduce((acc, issue) => {
        return { ...acc, [issue?.path?.[0]]: issue?.message };
      }, {});
      setError(message);
      return;
    }

    const res = await createChannel({
      name: channel,
      handle,
      avatar: avatarPreview,
    });
   
    if(!res?.success){
      toast({
        type: "error",
        name: "Failed!",
        description: res?.message,
        position: "top-end",
        duration: 4000,
      });
    }else{
      toast({
        type: "success",
        name: "Success",
        description: res?.message,
        position: "top-end",
        duration: 4000,
      });
    }

    if(res?.success){
      setChannelData({ channel: "", handle: "" });
      setIsHandleCorrectAndUnique(false);
      setAvatarPreview(null);
      setError(null);
      setTimeout(() => router.push("/channel"), 1000); 
    }
  };

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
                onChange={createOwnHandle}
                name="handle"
                placeholder="Handle"
                className="py-3"
              />
              {error?.handle ? (
                <p className="text-sm text-red-500">{error?.handle}</p>
              ) : (channelData?.handle && (
                <p className={`border px-2 py-1 w-max rounded-md mt-2 ${isHandleCorrectAndUnique ? "text-emerald-700 border-emerald-700 bg-emerald-200" : "text-rose-700 bg-rose-200 border-rose-700"}`}>
                  {channelData?.handle ? channelData?.handle : ""}
                </p>
              ))}
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
      <Toaster toasts={toasts} dismiss={dismiss} />
    </div>
  );
};

export default page;
