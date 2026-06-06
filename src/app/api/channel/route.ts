import { Channel } from "@/src/features/channels/channels.schema";
import { dbConnect } from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized user!",
        },
        { status: 401 },
      );
    }

    await dbConnect();

    const allChannels = await Channel.find({ userId: session?.user?.id })
      .limit(10)
      .lean();

    if (allChannels) {
      return NextResponse.json({
        success: true,
        channels: allChannels,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error getting channels",
      },
      {
        status: 500,
      },
    );
  }
}
