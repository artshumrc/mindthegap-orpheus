import mongoose from 'mongoose';
import check from 'check-types';

// models
import ItemSchema from '../models/itemSchema';

// api
import { getAllItemSchemaFields } from './filed';

// plug-ins
import timestamp from 'mongoose-timestamp';
import URLSlugs from 'mongoose-url-slugs';
import language from './plugins/language';


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

	_generateMongooseItemSchemaFields() {
		if (this._itemSchema) {
			const mongooseItemSchemaFields = {};
			this._fileds.forEach((Filed) => {
				mongooseItemSchemaFields[filed._id] = Field.mongooseFields;
			});
			return mongooseItemSchemaFields;
		}
		throw new Error('Run init method');
	}

	_generateDefaultItemSchemaFields() {
		return {
			title: {
				type: String,
				unique: true,
				required: true,
				trim: true,
				index: true
			},
			collectionId: {
				type: Schema.Types.ObjectId,
				ref: 'Collection',
				index: true,
				required: true,
			}
		};
	}

	get ItemModel() {
		const mongooseItemSchemaFields = this._generateMongooseItemSchemaFields();
		const defaultItemSchemaFields = this._generateDefaultItemSchemaFields();
		const itemSchemaFields = {
			...mongooseItemSchemaFields,
			...defaultItemSchemaFields,
		};
		const Schema = mongoose.Schema;
		const GeneratedItemSchema = new Schema(itemSchemaFields);

		// add timestamps (createdAt, updatedAt)
		GeneratedItemSchema.plugin(timestamp);

		// add slug (slug)
		GeneratedItemSchema.plugin(URLSlugs('name'));

		// add language (language)
		GeneratedItemSchema.plugin(language);

		const ItemModel = mongoose.model('Item', GeneratedItemSchema);

		return ItemModel;
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
