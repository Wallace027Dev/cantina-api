/* eslint-disable @typescript-eslint/require-await */
import { Injectable, NotFoundException } from "@nestjs/common";
import { EventDayEntity } from "./event-day.entity";

@Injectable()
export class EventDayRepository {
	private events: EventDayEntity[] = [];
	async list() {
		return this.events;
	}

	async findById(id: string) {
		return this.events.find((e) => e.id === id);
	}

	async save(eventDay: EventDayEntity) {
		this.events.push(eventDay);
		return eventDay;
	}

	async update(id: string, dataForUpdate: Partial<EventDayEntity>) {
		const event = await this.findById(id);
		if (!event) throw new NotFoundException("EventDay não encontrado");

		if (dataForUpdate.date) {
			event.date = new Date(dataForUpdate.date);
		}

		return event;
	}

	async delete(id: string) {
		const event = await this.findById(id);
		if (!event) throw new NotFoundException("EventDay nao encontrado.");

		this.events = this.events.filter((e) => e.id !== id);

		return id;
	}
}
