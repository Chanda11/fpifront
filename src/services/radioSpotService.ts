import { BaseService } from "./BaseService";

export interface RadioSpot {

  id: number;

  title: string;

  description?: string;

  station: string;

  duration?: string;

  image?: string;

  audioUrl?: string;

  broadcastAt: string;

}

class RadioSpotService
  extends BaseService<RadioSpot> {

  constructor() {
    super("/radio-spots");
  }

}

export const radioSpotService =
  new RadioSpotService();