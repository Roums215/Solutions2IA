import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
Config.setEntryPoint("./remotion/index.ts");

// Ports fixes dans la plage du projet (4500-4549), voir docs/ports-et-processus.md.
// Sans eux, Remotion prend le premier port libre dès 3000 : la plage d'AgentAI.
Config.setStudioPort(4520);
Config.setRendererPort(4530);
