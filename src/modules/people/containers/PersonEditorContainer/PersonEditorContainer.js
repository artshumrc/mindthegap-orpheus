import React from 'react';
import { compose } from 'react-apollo';
import autoBind from 'react-autobind';
import { arrayMove } from 'react-sortable-hoc';

import PersonEditor from '../../components/PersonEditor';
import personListQuery from '../../graphql/queries/list';
import personDetailQuery from '../../graphql/queries/detail';
import personCreateMutation from '../../graphql/mutations/create';
import personUpdateMutation from '../../graphql/mutations/update';
import personRemoveMutation from '../../graphql/mutations/remove';


class PersonEditorContainer extends React.Component {
	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {
			files: [],
			metadataFieldsExtra: [],
			selectedItems: [],
			selectedEvents: [],
			selectedInterviews: [],
		};
	}

	componentWillReceiveProps(nextProps) {
		if (
			(
				!this.state.files
			|| !this.state.files.length
			)
			&& nextProps.personQuery
			&& nextProps.personQuery.project
			&& nextProps.personQuery.project.person
			&& nextProps.personQuery.project.person.files
		) {
			this.setState({
				files: nextProps.personQuery.project.person.files
			});
		}
	}

	handleSubmit(_values) {
		const { personCreate, personUpdate, router } = this.props;
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

				// default value (files/persons handled by extra state)
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

		console.log('######')
		console.log('######')
		console.log('######')
		console.log(values);
		console.log('######')
		console.log('######')
		console.log('######')

		// create or update
		if ('_id' in values) {
			personUpdate(values, files)
				.then((response) => {
					router.replace(`/persons/${values._id}/${values.slug}`);
				})
				.catch((err) => {
					console.error(err);
				});
		} else {
			personCreate(values, files)
				.then((response) => {
					router.replace('/persons/');
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}

	handleRemove(personId) {
		const { personRemove, router } = this.props;

		personRemove(personId)
			.then((response) => {
				router.replace('/persons');
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
	}

	toggleSelectedEvent(event) {
		const selectedEvents = this.state.selectedEvents.slice();

		if (selectedEvents.some(selectedEvent => selectedEvent._id === event._id)) {
			selectedEvents.splice(
				selectedEvents.findIndex(selectedEvent => selectedEvent._id === event._id),
				1
			);
		} else {
			selectedEvents.push(event);
		}

		this.setState({
			selectedEvents,
		});
	}

	toggleSelectedInterview(interview) {
		const selectedInterviews = this.state.selectedInterviews.slice();

		if (selectedInterviews.some(selectedInterview => selectedInterview._id === interview._id)) {
			selectedInterviews.splice(
				selectedInterviews.findIndex(selectedInterview => selectedInterview._id === interview._id),
				1
			);
		} else {
			selectedInterviews.push(interview);
		}

		this.setState({
			selectedInterviews,
		});
	}

	render() {
		const { files, selectedItems, selectedEvents, selectedInterviews } = this.state;

		let person;

		if (
			this.props.personQuery
			&& this.props.personQuery.project
		) {
			person = this.props.personQuery.project.person;
		}

		return (
			<PersonEditor
				onSubmit={this.handleSubmit}
				onRemove={this.handleRemove}
				initialValues={person}
				files={files}
				addFile={this.addFile}
				removeFile={this.removeFile}
				onSortEnd={this.onSortEnd}
				updateFile={this.updateFile}
				handleUpdateMetadata={this.updateMetadata}
				selectedItems={selectedItems}
				toggleSelectedItem={this.toggleSelectedItem}
				selectedEvents={selectedEvents}
				toggleSelectedEvent={this.toggleSelectedEvent}
				selectedInterviews={selectedInterviews}
				toggleSelectedInterview={this.toggleSelectedInterview}
			/>
		);
	}
}

export default compose(
	personCreateMutation, personUpdateMutation, personRemoveMutation, personDetailQuery,
	personListQuery,
)(PersonEditorContainer);
