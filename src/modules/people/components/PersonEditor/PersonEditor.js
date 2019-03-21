import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ItemSelectorField from '../../../dashboard/components/ItemSelectorField';
import ItemEditorUploader from '../../../dashboard/components/ItemEditorUploader';
import { required, maxLength } from '../../../../lib/formHelpers';
import MetadataFields from '../../../items/components/MetadataFields';

import './PersonEditor.css';


const maxLength200 = maxLength(200);
const maxLength200000 = maxLength(200000);


class PersonEditor extends React.Component {

	render() {
		const { person, files, metadata, selectedItems, selectedEvents, selectedInterviews, selectedStorymaps } = this.props;

		return (
			<div className="personEditor">

				<div className="personEditorHead">
					<h1>{person ? 'Edit' : 'Create'} Person</h1>
				</div>

				<div className="personEditorFormInputOuter personEditorFormImageOuter">
					<label>Profile Image</label>
					<ItemEditorUploader
						files={files}
						addFile={this.props.addFile}
						removeFile={this.props.removeFile}
						onSortEnd={this.props.onSortEnd}
						updateFile={this.props.updateFile}
					/>
				</div>

				<form
					className="personEditorForm"
					onSubmit={this.props.handleSubmit}
				>
					<div className="personEditorFormInputOuter personEditorFormTitleOuter">
						<label>Name</label>
						<Field
							name="name"
							type="text"
							component="input"
							placeholder="Name of this individual"
							validate={[required, maxLength200]}
						/>
						<span
							className="personEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="personEditorFormInputOuter personEditorFormDescriptionOuter">
						<label>Enter the biography of this individual.</label>
						<Field
							name="bio"
							type="text"
							component="textarea"
							placeholder="Biography of the individual . . . "
							validate={[maxLength200000]}
						/>
						<span
							className="personEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="personEditorFormInputOuter personEditorFormInputOuterMetadata">
						<label>Associate interviews with this person.</label>
						<ItemSelectorField
							collectionName="interviews"
							selectedItems={selectedInterviews}
							toggleSelectedItem={this.props.toggleSelectedInterview}
						/>
					</div>

					<div className="personEditorFormInputOuter personEditorFormInputOuterMetadata">
						<label>Associate events with this person.</label>
						<ItemSelectorField
							collectionName="events"
							selectedItems={selectedEvents}
							toggleSelectedItem={this.props.toggleSelectedEvent}
						/>
					</div>

					<div className="personEditorFormInputOuter personEditorFormInputOuterMetadata">
						<label>Associate items with this person.</label>
						<ItemSelectorField
							collectionName="items"
							selectedItems={selectedItems}
							toggleSelectedItem={this.props.toggleSelectedItem}
						/>
					</div>

					<div className="personEditorFormInputOuter personEditorFormInputOuterMetadata">
						<label>Associate a Story Map with this person.</label>
						<ItemSelectorField
							collectionName="storymap"
							selectedItems={storymaps}
							toggleSelectedItem={this.props.toggleSelectedItem}
						/>
					</div>


					<div className="personEditorFormInputOuter personEditorFormInputOuterMetadata">
						<label>Enter additional metadata for this person.</label>
						<FieldArray
							name="metadata"
							component={MetadataFields}
							metadata={metadata}
							handleUpdateMetadata={this.props.handleUpdateMetadata}
						/>
					</div>


					<div className="personEditorFormInputOuter">
						<button
							type="submit"
							className={`
								personEditorButton
							`}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		);
	}
}


PersonEditor.propTypes = {
	person: PropTypes.object,
	files: PropTypes.array,
	metadata: PropTypes.array,
};


let PersonEditorForm = reduxForm({
	form: 'PersonEditor',
	enableReinitialize: true,
})(PersonEditor);

const selector = formValueSelector('PersonEditor') // <-- same as form name

const mapStateToProps = (state, props) => {
	const metadata = selector(state, 'metadata')

	return {
		metadata,
	};
};

PersonEditorForm = connect(
	mapStateToProps
)(PersonEditorForm);

export default PersonEditorForm;
