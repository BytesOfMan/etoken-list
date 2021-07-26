import axios, { AxiosRequestConfig } from "axios";
import { Config } from "./config";
const ecashaddr = require('ecashaddrjs');

export class Utils {
    public static async GetBestBlockHeight() {
        const q = {
            v: 3,
            q: {
                db: ["s"],
                aggregate: [
                    { $match: {}},
                    { $project: { _id: 0, blk: "$bchBlockHeight" }}
                ],
                limit: 1,
            }
        };
        const data = Buffer.from(JSON.stringify(q)).toString("base64");
        const config: AxiosRequestConfig = {
            method: "GET",
            url: Config.url + "/q/" + data,
        };
        const response = (await axios(config)).data.s[0];
        return response.blk as number;
    }
}

export function toEcashAddr(bchAddress : string) {
    const { prefix, type, hash } = ecashaddr.decode(bchAddress);
    return ecashaddr.encode('ecash', type, hash); 
}
export function toEtokenAddr(slpAddress : string) {
const { prefix, type, hash } = ecashaddr.decode(slpAddress);
    return ecashaddr.encode('etoken', type, hash); 
}
