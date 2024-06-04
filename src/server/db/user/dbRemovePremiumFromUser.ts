export async function dbRemovePremiumFromUser(
  mongoose: any,
  customerId: string
) {
  const User = mongoose.model("User");

  try {
    return User.updateOne(
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
    throw error;
  }
}
