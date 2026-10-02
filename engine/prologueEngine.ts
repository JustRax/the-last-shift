import type { GameStage, InvestigationId } from "@/types/game";

export function canInvestigate(
  stage: GameStage,
  investigated: InvestigationId[],
  id: InvestigationId,
) {
  if (stage !== "investigation") return false;
  if (id !== "computer" && !investigated.includes("computer")) return false;
  return true;
}

export function getNextStageAfterInvestigation(
  investigated: InvestigationId[],
): GameStage {
  if (investigated.includes("phone")) return "phone-choice";
  return "investigation";
}
