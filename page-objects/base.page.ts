import { Page } from '@playwright/test';
import { Stagehand } from "@browserbasehq/stagehand";

type StagehandType = typeof Stagehand;

/**
 * Represents the base page for all page objects.
 * It provides the common page property and Stagehand integration that can be shared across different pages.
 */
export abstract class BasePage {
  protected page: Page;
  protected stagehand: InstanceType<StagehandType>;

  /**
   * Initializes a new instance of the BasePage class.
   * @param page The Playwright page object.
   */
  constructor(page: Page) {
    this.page = page;
    this.stagehand = new Stagehand({
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
  }
} 