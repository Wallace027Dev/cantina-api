/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventDayEntity } from "./event-day.entity";

@Injectable()
export class EventDayRepository {
	private events: EventDayEntity[] = [];
	async list() {
		return this.events;
	}

	async create(eventDay: EventDayEntity) {
		this.events.push(eventDay);
		return eventDay;
	}

	async update(id: string, dataForUpdate: Partial<EventDayEntity>) {
		const event = this.events.find((e) => e.id === id);
		if (!event) throw new NotFoundException("EventDay não encontrado");

		if (dataForUpdate.date) {
			event.date = new Date(dataForUpdate.date);
		}

		return event;
	}
}
