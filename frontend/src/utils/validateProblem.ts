import type { ProblemCardProps } from "../types/types";
import validateUser from "./validateUser";

function validateProblem(challenge: ProblemCardProps): void {

    if (challenge.title === "") {
        throw new Error("Tittel-feltet er tomt")
    }

    if (challenge.vendor === "") {
        throw new Error("System-feltet er tomt")
    }

    if (challenge.specificProblem === "") {
        throw new Error("Spesifikt problem-feltet er tomt")
    }

    if (challenge.subCount < 0) {
        throw new Error("Mengden abonnenter er negativ");
    }

    validateUser(challenge.owner);
}

export default validateProblem;
