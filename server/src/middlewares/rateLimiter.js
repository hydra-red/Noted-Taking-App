import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({
        message: "Too many resquest, please try again later",
      });
    }
    next();
  } catch (error) {
    console.error("Something went wrong with upstash Ratelimit", error.message);
    res
      .status(500)
      .json({ message: "Something went wrong with upstash Ratelimit" });
      next(error)
  }
};

export default rateLimiter;
