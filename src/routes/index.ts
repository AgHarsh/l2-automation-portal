import { Router } from "express";
import auth from "./auth";
import user from "./user";
import service from "./service";
import serverGrp from "./serverGrp";
import server from "./server";
import alert from "./alert";
import script from "./script";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/service", service);
routes.use("/serverGrp", serverGrp);
routes.use("/server", server);
routes.use("/alert", alert);
routes.use("/script", script);

export default routes;