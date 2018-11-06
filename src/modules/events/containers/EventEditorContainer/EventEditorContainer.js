import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';
import { arrayMove } from 'react-sortable-hoc';

import EventEditor from '../../components/EventEditor';
import eventListQuery from '../../graphql/queries/list';
import eventDetailQuery from '../../graphql/queries/detail';
import eventCreateMutation from '../../graphql/mutations/create';
import eventUpdateMutation from '../../graphql/mutations/update';
import eventRemoveMutation from '../../graphql/mutations/remove';


class EventEditorContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {
			files: [],
			metadataFieldsExtra: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		if (
			(
				!this.state.files
			|| !this.state.files.length
			)
			&& nextProps.eventQuery
			&& nextProps.eventQuery.project
			&& nextProps.eventQuery.project.event
			&& nextProps.eventQuery.project.event.files
		) {
			this.setState({
				files: nextProps.eventQuery.project.event.files
			});
		}
	}

	handleSubmit(_values) {
		const { eventCreate, eventUpdate, router } = this.props;
		const _files = this.state.files;
		const values = Object.assign({}, _values);

		// remove non-input values
		delete values.__typename;
		delete values.comments;
		delete values.commentsCount;
		delete values.files;
		delete values.manifest;

		// sanitize metadata
		const metadata = [];
		if (values.metadata) {
			values.metadata.forEach((metadataField, i) => {
				// default type
				let type = 'text';

				// default value (files/events handled by extra state)
				let value = metadataField.value;

				// set type from metadata redux form
				if (
					metadataField.type
					&& typeof metadataField.type !== 'undefined'
				) {
					type = metadataField.type;
				}

				// set extra field value from state
				if (!value) {
					this.state.metadataFieldsExtra.forEach(metadataFieldExtra => {
						if (metadataFieldExtra.field === `metadata[${i}]`) {
							value = JSON.stringify(metadataFieldExtra.value);
						}
					});
				}

				metadata.push({
					type,
					label: metadataField.label,
					value,
				});
			});
		}
		values.metadata = metadata;

		// sanitize files
		const files = [];
		_files.forEach(_file => {
			const file = Object.assign({}, _file);
			delete file.__typename;
			files.push(file);
		});

		// create or update
		if ('_id' in values) {
			eventUpdate(values, files)
				.then((response) => {
					router.replace(`/events/${values._id}/${values.slug}`);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			eventCreate(values, files)
				.then((response) => {
					router.replace('/events/');
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	handleRemove(eventId) {
		const { eventRemove, router } = this.props;

		eventRemove(eventId)
			.then((response) => {
				router.replace('/events');
			})
			.catch((err) => {
				console.error(err);
			});
	}

	addFile(file) {
		const files = this.state.files.slice();

		files.push(file);
		this.setState({
			files,
		});
	}

	removeFile(index, a, b, c) {
		const files = this.state.files.slice();
		files.splice(index, 1);
		this.setState({
			files,
		});
	}

	onSortEnd({ oldIndex, newIndex }) {
		this.setState({
			files: arrayMove(this.state.files, oldIndex, newIndex),
		});
	}

	updateFile(index, file) {
		const files = this.state.files.slice();

		files[index] = file;

		this.setState({
			files,
		});
	}

	updateMetadata(field, value) {
		const metadataFieldsExtra = this.state.metadataFieldsExtra.slice();
		let existingField = false;

		metadataFieldsExtra.forEach(metadataFieldExtra => {
			if (metadataFieldExtra.field === field) {
				metadataFieldExtra.value = value;
				existingField = true;
			}
		});

		if (!existingField) {
			metadataFieldsExtra.push({
				field,
				value,
			});
		}

		this.setState({
			metadataFieldsExtra,
		});
	}


	render() {
		const { files } = this.state;

		let event;

		if (
			this.props.eventQuery
			&& this.props.eventQuery.project
		) {
			event = this.props.eventQuery.project.event;
		}

		return (
			<EventEditor
				onSubmit={this.handleSubmit}
				onRemove={this.handleRemove}
				initialValues={event}
				files={files}
				addFile={this.addFile}
				removeFile={this.removeFile}
				onSortEnd={this.onSortEnd}
				updateFile={this.updateFile}
				handleUpdateMetadata={this.updateMetadata}
			/>
		);
	}
}

export default compose(
	eventCreateMutation, eventUpdateMutation, eventRemoveMutation, eventDetailQuery,
	eventListQuery,
)(EventEditorContainer);
