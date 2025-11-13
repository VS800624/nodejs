const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "rejected", "interested", "accepted"],
        message: `{VALUE} is  incorrect status type `,
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function(next) {
  const connectionRequest = this
  // Check if the fromUserId is same as toUserId
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send connection request to yourself!")
  }
  next()
})

const ConnectionRequest = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
)

module.exports = ConnectionRequest