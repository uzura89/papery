export async function dbPurchaseSubscription(
  mongoose: any,
  email: string,
  details: {
    customerId: string;
    purchaseId: string;
    purchasePlan: string;
    subscriptionId: string;
    subscriptionCurrentPeriodEnd: number;
    subscriptionCancelAtPeriodEnd: boolean;
  }
) {
  const User = mongoose.model("User");

  try {
    await User.updateOne(
      { email },
      {
        $set: {
          customerId: details.customerId,
          purchaseId: details.purchaseId,
          purchasePlan: details.purchasePlan,
          subscriptionId: details.subscriptionId,
          subscriptionCurrentPeriodEnd: details.subscriptionCurrentPeriodEnd,
          subscriptionCancelAtPeriodEnd: details.subscriptionCancelAtPeriodEnd,
        },
      }
    );

    return;
  } catch (error) {
    throw error;
  }
}
