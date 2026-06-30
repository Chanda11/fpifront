import { BaseService } from "./BaseService";
import { HomepageSection } from "../types/homepage";
import { api } from "./api";

class HomepageService extends BaseService<HomepageSection> {
  constructor() {
    super("/homepage");
  }

  getSection(section: string) {
    return api.get<HomepageSection>(
      `/homepage/${section}`
    );
  }

  updateSection(
    section: string,
    data: Partial<HomepageSection>
  ) {
    return api.put<HomepageSection>(
      `/homepage/${section}`,
      data
    );
  }
}

export const homepageService = new HomepageService();