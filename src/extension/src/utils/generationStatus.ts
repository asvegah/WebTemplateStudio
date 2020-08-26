import { EXTENSION_COMMANDS } from "../constants/commands";
import { Controller } from "../controller";

export enum GenerationItemStatus {
  Stopped = "Stopped",
  Generating = "Generating",
  Failed = "Failed",
  Success = "Success",
}

export const GENERATION_NAMES = {
  TEMPLATES: "templates",
  APP_SERVICE: "appService",
  COSMOS_DB: "cosmosDB",
};

export const sendToClientGenerationStatus = (name: string, status: string, message?: string, data?: any) => {
  Controller.reactPanelContext.postMessageWebview({
    command: EXTENSION_COMMANDS.GEN_STATUS,
    payload: {
      name,
      status,
      message,
      data,
    },
  });
};

export const updateStatusMessage = (message: string) => {
  sendToClientGenerationStatus(GENERATION_NAMES.TEMPLATES, GenerationItemStatus.Generating, message);
};