import { tokenValidationMiddleware } from "../../adapters/middlewares/tokenValidationMiddleware";
import { JwtService } from "../services/jwtService";

const jwtService = new JwtService()
export const injectedTokenMiddleware =  tokenValidationMiddleware(jwtService)