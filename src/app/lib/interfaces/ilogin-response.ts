import {IUser} from "./iuser";
import {ITokenPayload} from "./itoken-payload";

export interface ILoginResponse {
  user: IUser;
  token: ITokenPayload;
}
