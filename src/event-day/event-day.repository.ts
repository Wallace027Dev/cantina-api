import { Injectable } from "@nestjs/common";

@Injectable()
export class EventDayRepository {
  private events: {
    date: Date;
    products: { name: string; price: number }[];
  }[] = [];

  async list() {
    return this.events;
  }

  async create(event: {
    date: Date;
    products: { name: string; price: number }[];
  }) {
    this.events.push(event);
    console.log(this.events);
    return event;
  }
}
