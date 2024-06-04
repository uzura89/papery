export async function dbPurchaseSubscription(
  mongoose: any,
  email: string,
  details: {
    customerId: string;
    purchaseId: string;
    purchasePlan: string;
    subscriptionId: string;
    subscriptionRenewalDate: number;
    cancelOnPeriodEnd: boolean;
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
          subscriptionRenewalDate: details.subscriptionRenewalDate,
          cancelOnPeriodEnd: details.cancelOnPeriodEnd,
        },
      }
    );

    return;
  } catch (error) {
    throw error;
  }
}
