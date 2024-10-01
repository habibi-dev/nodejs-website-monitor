import axios from 'axios';
import RequestHandler from "../../../lib/RequestHandler";

export class WebsiteCheckerRepository {
    async checkSite(url: string, method: 'GET' | 'POST' | 'DELETE' = 'GET', data: object = {}): Promise<number | string> {
        try {
            let response;
            switch (method) {
                case 'POST':
                    response = await RequestHandler.post(url, data);
                    break;
                case 'DELETE':
                    response = await RequestHandler.delete(url, data);
                    break;
                case 'GET':
                default:
                    response = await RequestHandler.get(url, data);
                    break;
            }
            return response ? 200 : 500;
        } catch (error: any) {
            return error.message;
        }
    }
}
