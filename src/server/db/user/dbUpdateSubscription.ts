export async function dbUpdateSubscription(
  mongoose: any,
  customerId: string,
  data: {
    cancelOnNextRenewal: boolean;
    subscriptionRenewalDate: number;
  }
) {
  try {
    const User = mongoose.model("User");

    await User.update(
      { customerId },
      {
        $set: {
          subscriptionRenewalDate: data.subscriptionRenewalDate,
          cancelOnNextRenewal: data.cancelOnNextRenewal,
        },
      }
    );
  } catch (error) {
    throw error;
  }
}
