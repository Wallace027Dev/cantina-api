import { Injectable } from "@nestjs/common";
import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
} from "class-validator";
import { UserService } from "../user.service";

@Injectable()
@ValidatorConstraint({ async: true })
export class NameIsUniqueValidator implements ValidatorConstraintInterface {
	constructor(private userService: UserService) {}

	async validate(value: string): Promise<boolean> {
		const userExists = await this.userService.searchByName(value);
		return !userExists;
	}
}

export const NameIsUnique = (validationOptions?: ValidationOptions) => {
	return (object: object, propertyName: string) => {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: NameIsUniqueValidator,
		});
	};
};
