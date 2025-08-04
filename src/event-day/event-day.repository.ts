/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { EventDayEntity } from "./event-day.entity";

@Injectable()
export class EventDayRepository {
	private events: EventDayEntity[] = [];

	async list() {
		return this.events;
	}

	async create(eventDay: EventDayEntity) {
		this.events.push(eventDay);
		console.log(this.events);
		return eventDay;
	}
}
