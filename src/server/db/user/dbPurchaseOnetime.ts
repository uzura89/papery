export async function dbPurchaseOnetime(
  mongoose: any,
  email: string,
  details: {
    customerId: string;
    purchaseId: string;
    purchasePlan: string;
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
        },
      }
    );

    return;
  } catch (error) {
    throw error;
  }
}
