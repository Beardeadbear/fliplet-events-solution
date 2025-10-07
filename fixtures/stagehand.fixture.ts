import { test as base, Page } from '@playwright/test';
import { Stagehand } from "@browserbasehq/stagehand";

type StagehandType = typeof Stagehand;

type StagehandFixture = {
  stagehand: InstanceType<StagehandType>;
};

export const test = base.extend<StagehandFixture>({
  stagehand: async ({ page }: { page: Page }, use: (stagehand: InstanceType<StagehandType>) => Promise<void>) => {
    const stagehand = new Stagehand({
      env: (process.env.STAGEHAND_ENV as 'LOCAL' | 'BROWSERBASE') || 'LOCAL',
      apiKey: process.env.BROWSERBASE_API_KEY,
      projectId: process.env.BROWSERBASE_PROJECT_ID,
      domSettleTimeoutMs: 30_000,
      enableCaching: true,
      modelName: process.env.STAGEHAND_MODEL || 'gpt-4o',
      modelClientOptions: {
        apiKey: process.env.OPENAI_API_KEY,
      },
      verbose: 2,
    });

    await stagehand.init();
    await use(stagehand);
    await stagehand.close();
  }
});

export { expect } from '@playwright/test';
