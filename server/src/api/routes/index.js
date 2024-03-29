import { Router } from "express";
import authRouter from "./auth.route.js";
import profileRouter from "./profile.route.js";
import locationRouter from "./location.routes.js";
import userRouter from "./user.route.js";
import {
  kidCollectionProvider,
  landingProvider,
} from "../controller/landing.controller.js";
import productRoute from "./product.route.js";
import reviewRoute from "./review.route.js";

const mainRoutes = Router();

mainRoutes.use("/auth", authRouter);
mainRoutes.use("/profile", profileRouter);
mainRoutes.use("/location", locationRouter);
mainRoutes.use("/user", userRouter);
mainRoutes.use("/products", productRoute);
mainRoutes.get("/", landingProvider);
mainRoutes.get("/kid-collection/:brand?", kidCollectionProvider);
mainRoutes.use("/review", reviewRoute);

export default mainRoutes;
