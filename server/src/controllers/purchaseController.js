import Purchase from "../models/purchaseModel.js";

/* BUY EXAM */
export const purchaseExam = async (req, res) => {
  try {
    let { name, whatsapp, examName, price } = req.body;

    const cleanName = name.trim().toLowerCase();
    const cleanWhatsapp = whatsapp.replace(/\D/g, "");

    const purchase = await Purchase.create({
      name: cleanName,
      whatsapp: cleanWhatsapp,
      examName,
      price
    });

    res.json({
      success: true,
      purchase
    });

  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "This student already purchased with this WhatsApp number."
      });
    }

    res.status(500).json({ message: "Purchase failed" });
  }
};


export const checkPurchase = async (req, res) => {
  try {
    let { name, whatsapp } = req.body;

    const cleanName = name.trim().toLowerCase();
    const cleanWhatsapp = whatsapp.replace(/\D/g, "");

    const purchase = await Purchase.findOne({
      name: cleanName,
      whatsapp: cleanWhatsapp,
      status: "success",
      user: null
    });

    if (!purchase) {
      return res.status(404).json({
        message: "No valid purchase found"
      });
    }

    res.json({
      success: true,
      purchaseId: purchase._id
    });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


/* GET HISTORY */
export const getPurchases = async (req, res) => {
  const purchases = await Purchase.find({
    user: req.user._id
  }).sort({ createdAt: -1 });

  res.json(purchases);
};


