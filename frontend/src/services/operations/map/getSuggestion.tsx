import { apiConnector } from "../../apiConnector";
import { MAP } from "../../apis";
export const getSuggestions = async (input: string) : Promise<string[]> => {
    if (!input || input.length <=2) {
    return [];
  }
    try {
        const url = `${MAP.suggetions}?input=${encodeURIComponent(input)}`;
        const response = await apiConnector(
            "GET",
            url,
            undefined,
            {
                'Content-Type': 'application/json'
            }
        );
        console.log("response from getSuggestions", response);
        return response.data.data
    } catch (e) {
        console.error("error from getSuggestions", e);
        return[]
    }
}
