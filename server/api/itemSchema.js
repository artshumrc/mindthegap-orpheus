import check from 'check-types';

// models
import ItemSchema from '../models/itemSchema';

// api
import { getAllItemSchemaFields } from './filed';

export default class ItemSchemaClass {
	
	constructor() {
		this._itemSchema = null;
		this._fileds = [];
	}

	async init(name) {
		check.asser.string(name);
		try {
			const itemSchema = await ItemSchema.findOne({ name });
			if (itemSchema) {
				this._itemSchema = itemSchema;
				this._fileds = await getAllItemSchemaFields(this._itemSchema);
				return this;
			}
			throw new Error(`Item Schame with name: ${name} is not available`);
		} catch (err) {
			throw err;
		}
	}

	get isSet() {
		if (this._itemSchema) return true;
		throw new Error('Run init method');
	}

	get name() {
		if (this.isSet) return this._itemSchema.name;
	}

	get languages() {
		if (this.isSet) return this._itemSchema.languages;
	}

	get private() {
		if (this.isSet) return this._itemSchema.private;
	}
}
