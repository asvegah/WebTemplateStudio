import { WizardServant, IPayloadResponse } from "../wizardServant";
import { PROJECT_NAME_VALIDATION_LIMIT } from "../constants/constants";
import * as vscode from "vscode";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";
import { ExtensionCommand } from "../constants/commands";

export class Defaults extends WizardServant {
  clientCommandMap: Map<ExtensionCommand,(message: any) => Promise<IPayloadResponse>>;

  constructor() {
    super();
    this.clientCommandMap = this.defineCommandMap();
  }

  private defineCommandMap(): Map<
    ExtensionCommand,
    (message: any) => Promise<IPayloadResponse>
  > {
    return new Map([
      [ExtensionCommand.GetProjectName, this.getProjectName],
      [ExtensionCommand.GetOutputPath, this.getOutputPath]
    ]);
  }

  public async getProjectName(message: any): Promise<IPayloadResponse> {
    const userOutputPath = vscode.workspace
      .getConfiguration()
      .get<string>("wts.changeSaveToLocation");
    const outputPath: string = userOutputPath ? userOutputPath : os.homedir();
    const defaultAppName = "myApp";
    let newAppName = defaultAppName;
    let count = 1;

    while (
      fs.existsSync(path.join(outputPath, newAppName)) &&
      count <= PROJECT_NAME_VALIDATION_LIMIT
    ) {
      newAppName = `${defaultAppName}${count}`;
      count++;
    }
    if (count > PROJECT_NAME_VALIDATION_LIMIT) {
      newAppName = "";
    }
    return {
      payload: {
        scope:message.payload.scope,
        projectName: newAppName
      }
    };
  }

  public async getOutputPath(message: any): Promise<IPayloadResponse> {
    const userOutputPath = vscode.workspace
      .getConfiguration()
      .get<string>("wts.changeSaveToLocation");

    const outputPath: string = userOutputPath ? userOutputPath : os.homedir();
    return {
      payload: {
        scope:message.payload.scope,
        outputPath: outputPath
      }
    };
  }
}
