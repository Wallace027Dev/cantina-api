import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";
import { EventDayEntity } from "./event-day.entity";

@Injectable()
export class EventDayService {
	constructor(
		@InjectRepository(EventDayEntity)
		private readonly eventDayRepository: Repository<EventDayEntity>,
	) {}

	async getAllEventDays(): Promise<EventDayEntity[]> {
		return await this.eventDayRepository.find();
	}

	async createEventDay(eventDay: EventDayEntity): Promise<EventDayEntity> {
		return await this.eventDayRepository.save(eventDay);
	}

	async updateEventDay(id: string, dataForUpdate: Partial<EventDayEntity>) {
		await this.eventDayRepository.update(id, dataForUpdate);
	}

	async deleteEventDay(id: string) {
		await this.eventDayRepository.delete(id);
	}
}
