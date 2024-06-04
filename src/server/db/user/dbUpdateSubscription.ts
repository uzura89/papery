export async function dbUpdateSubscription(
  mongoose: any,
  customerId: string,
  data: {
    cancelOnNextRenewal: boolean;
    subscriptionRenewalDate: number;
  }
) {
  console.log("🚀 ~ data:", data);
  console.log("🚀 ~ customerId:", customerId);
  try {
    const User = mongoose.model("User");

    await User.updateOne(
      { customerId },
      {
        $set: {
          subscriptionRenewalDate: data.subscriptionRenewalDate,
          cancelOnNextRenewal: data.cancelOnNextRenewal,
        },
      }
    );
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
}
