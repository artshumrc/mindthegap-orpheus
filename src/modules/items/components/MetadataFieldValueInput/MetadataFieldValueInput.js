import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import autoBind from 'react-autobind';
import { arrayMove } from 'react-sortable-hoc';


import ItemEditorUploader from '../../../dashboard/components/ItemEditorUploader';
import ItemSelectorField from '../../../dashboard/components/ItemSelectorField';
import MetadataFieldMapInput from '../MetadataFieldMapInput';



class MetadataFieldValueInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			files: [],
			items: [],
			selectedItems: [],
		};
		autoBind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (
			(
				!this.state.files
			|| !this.state.files.length
			)
			&& nextProps.itemQuery
			&& nextProps.itemQuery.project
			&& nextProps.itemQuery.project.item
			&& nextProps.itemQuery.project.item.files
		) {
			this.setState({
				files: nextProps.itemQuery.project.item.files
			});
		}
	}

	addFile(file) {
		const files = this.state.files.slice();

		files.push(file);
		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	removeFile(index, a, b, c) {
		const files = this.state.files.slice();
		files.splice(index, 1);
		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	onSortEnd({ oldIndex, newIndex }) {
		const files = arrayMove(this.state.files, oldIndex, newIndex);
		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	updateFile(index, file) {
		const files = this.state.files.slice();

		files[index] = file;

		this.setState({
			files,
		});
		this.props.handleUpdateMetadata(this.props.field, files);
	}

	toggleSelectedItem(item) {
		const selectedItems = this.state.selectedItems.slice();

		if (selectedItems.some(selectedItem => selectedItem._id === item._id)) {
			selectedItems.splice(
				selectedItems.findIndex(selectedItem => selectedItem._id === item._id),
				1
			);
		} else {
			selectedItems.push(item);
		}

		this.setState({
			selectedItems,
		});
		this.props.handleUpdateMetadata(this.props.field, selectedItems);
	}

	handleChangeFieldMapInput(marker) {
		this.props.handleUpdateMetadata(this.props.field, marker);
	}

	render () {
		const { field, type, items, defaultValue } = this.props;

		let elem = null;

		switch (type) {
		case 'text':
			elem = (
				<Field
					name={`${field}.value`}
					type="text"
					component="textarea"
					placeholder="Value . . . "
				/>
			);
			break;
		case 'number':
			elem = (
				<Field
					name={`${field}.value`}
					type="number"
					component="input"
					placeholder="Value . . . "
				/>
			);
			break;
		case 'date':
			elem = (
				<Field
					name={`${field}.value`}
					type="date"
					component="input"
					placeholder="Value . . . "
				/>
			);
			break;
		case 'place':
			elem = (
				<MetadataFieldMapInput
					field={field}
					defaultValue={defaultValue}
					handleChangeFieldMapInput={this.handleChangeFieldMapInput}
				/>
			);
			break;
		case 'media':
			elem = (
				<ItemEditorUploader
					files={JSON.parse(defaultValue)}
					addFile={this.addFile}
					removeFile={this.removeFile}
					onSortEnd={this.onSortEnd}
					updateFile={this.updateFile}
					defaultValue={defaultValue}
				/>
			);
			break;
		case 'item':
			elem = (
				<ItemSelectorField
					items={items}
					selectedItems={this.state.selectedItems}
					toggleSelectedItem={this.toggleSelectedItem}
					defaultValue={defaultValue}
				/>
			);
			break;
		default:
			elem = (
				<Field
					name={`${field}.value`}
					type="text"
					component="input"
					placeholder="Value . . . "
				/>
			);
			break;
		}

		return elem;
	}
}

MetadataFieldValueInput.propTypes = {
	field: PropTypes.string,
	type: PropTypes.string,
	items: PropTypes.array,
};

MetadataFieldValueInput.defaultProps = {
	field: null,
	type: 'text',
	items: [],
};

export default MetadataFieldValueInput;
