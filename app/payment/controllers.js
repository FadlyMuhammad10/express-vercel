const paymentService = require("../../services/payment");

module.exports = {
  payment: async (req, res, next) => {
    try {
      res.send(await paymentService.paymentKelas(req));
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  },
  // callback: async (req, res, next) => {
  //   try {
  //     res.send(await paymentService.callback(req));
  //   } catch (error) {
  //     res
  //       .status(500)
  //       .json({ message: error.message || "Internal server error" });
  //   }
  // },
};
