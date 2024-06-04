export async function dbUpdateSubscription(
  mongoose: any,
  customerId: string,
  data: {
    subscriptionCurrentPeriodEnd: number;
    subscriptionCancelAtPeriodEnd: boolean;
  }
) {
  try {
    const User = mongoose.model("User");

    await User.updateOne(
      { customerId },
      {
        $set: {
          subscriptionCurrentPeriodEnd: data.subscriptionCurrentPeriodEnd,
          subscriptionCancelAtPeriodEnd: data.subscriptionCancelAtPeriodEnd,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
