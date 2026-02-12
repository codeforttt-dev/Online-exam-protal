import Purchase from "../models/purchaseModel.js";

/* BUY EXAM */
export const purchaseExam = async (req, res) => {
  try {
    const { name, whatsapp, examName, price } = req.body;

    const purchase = await Purchase.create({
      name,
      whatsapp,
      examName,
      price
    });

    res.json({
      success: true,
      purchase
    });

  } catch (err) {
    res.status(500).json({ message: "Purchase failed" });
  }
};

/* GET HISTORY */
export const getPurchases = async (req, res) => {
  const purchases = await Purchase.find({
    user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(purchases);
};

