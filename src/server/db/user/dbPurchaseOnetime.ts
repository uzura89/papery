export async function dbPurchaseOnetime(
  mongoose: any,
  email: string,
  details: {
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
