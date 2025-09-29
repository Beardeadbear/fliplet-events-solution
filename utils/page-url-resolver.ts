import * as fs from 'fs/promises';
import * as path from 'path';

class PageUrlResolver {
  private pageMap: Map<string, string> | null = null;
  private pomPath = path.resolve(__dirname, '..', 'POM.json');

  private async initialize() {
    if (this.pageMap) return;

    try {
      const data = await fs.readFile(this.pomPath, 'utf8');
      const pomData = JSON.parse(data);
      this.pageMap = new Map<string, string>();
      
      if (pomData && Array.isArray(pomData.pages)) {
        for (const page of pomData.pages) {
          if (page.title && page.slug) {
            this.pageMap.set(page.title, page.slug);
          }
        }
      }
    } catch (error) {
      console.error('Failed to read or parse POM.json:', error);
      throw new Error('Could not initialize PageUrlResolver.');
    }
  }

  public async getSlugByTitle(title: string): Promise<string> {
    await this.initialize();
    
    if (!this.pageMap || !this.pageMap.has(title)) {
      throw new Error(`Slug for page "${title}" not found in POM.json.`);
    }
    
    return this.pageMap.get(title)!;
  }
}

export default new PageUrlResolver(); 