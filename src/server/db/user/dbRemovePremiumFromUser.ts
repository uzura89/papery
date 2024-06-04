export async function dbRemovePremiumFromUser(
  mongoose: any,
  customerId: string
) {
  console.log("🚀 ~ customerId:", customerId);
  const User = mongoose.model("User");

  try {
    await User.updateOne(
      { customerId },
      {
        customerId: null,
        purchaseId: null,
        purchasePlan: null,
        subscriptionId: null,
        subscriptionCurrentPeriodEnd: null,
        subscriptionCancelAtPeriodEnd: null,
      }
    );

    return;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    throw error;
  }
}
