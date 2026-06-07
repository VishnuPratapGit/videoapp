import mongoose, {Document, Schema, Types} from "mongoose";

export interface ISubscription extends Document {
    userId: Types.ObjectId,
    channelId: Types.ObjectId,
    createdAt: Date,
}

const SubscriptionSchema = new Schema<ISubscription>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    channelId: {
        type: Schema.Types.ObjectId,
        ref: 'Channel',
        required: true
    }
}, {timestamps: true});

export const Subscription = mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', SubscriptionSchema);