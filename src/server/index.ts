import { Elysia } from "elysia";
import { failureRoute } from "./routes/transaction/failure";
import { successRoute } from "./routes/transaction/success";

new Elysia()
	.use(failureRoute)
	.use(successRoute)
	.get("/health", () => ({ status: "ok" }))
	.listen(8081);
