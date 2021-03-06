import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ItemEditorUploader from '../../../dashboard/components/ItemEditorUploader';
import { required, maxLength } from '../../../../lib/formHelpers';
import MetadataFields from '../../../items/components/MetadataFields';

import './EventEditor.css';


const maxLength200 = maxLength(200);
const maxLength200000 = maxLength(200000);


class ItemEditor extends React.Component {

	render() {
		const { item, files, metadata } = this.props;

		return (
			<div className="itemEditor">

				<div className="itemEditorHead">
					<h1>{item ? 'Edit' : 'Create'} Event</h1>

					<ItemEditorUploader
						files={files}
						addFile={this.props.addFile}
						removeFile={this.props.removeFile}
						onSortEnd={this.props.onSortEnd}
						updateFile={this.props.updateFile}
					/>
				</div>

				<form
					className="itemEditorForm"
					onSubmit={this.props.handleSubmit}
				>
					<div className="itemEditorFormInputOuter itemEditorFormTitleOuter">
						<label>Title</label>
						<Field
							name="title"
							type="text"
							component="input"
							placeholder="The event's title"
							validate={[required, maxLength200]}
						/>
						<span
							className="itemEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="itemEditorFormInputOuter ">
						<label>Start date:</label>
						<Field
							name="dateStart"
							type="date"
							component="input"
							placeholder="The event's start date"
						/>
						<span
							className="itemEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="itemEditorFormInputOuter ">
						<label>End date:</label>
						<Field
							name="dateEnd"
							type="date"
							component="input"
							placeholder="The event's end date"
						/>
						<span
							className="itemEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="itemEditorFormInputOuter ">
						<label>Date (for display):</label>
						<Field
							name="dateDisplay"
							type="text"
							component="input"
							placeholder="The date that should be displayed to the user"
						/>
						<span
							className="itemEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="itemEditorFormInputOuter itemEditorFormDescriptionOuter">
						<label>Enter a description of the event.</label>
						<Field
							name="description"
							type="text"
							component="textarea"
							placeholder="Example description of item . . . "
							validate={[maxLength200000]}
						/>
						<span
							className="itemEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="itemEditorFormInputOuter itemEditorFormInputOuterMetadata">
						<label>Enter metadata for this item.</label>
						<FieldArray
							name="metadata"
							component={MetadataFields}
							metadata={metadata}
							handleUpdateMetadata={this.props.handleUpdateMetadata}
						/>
					</div>


					<div className="itemEditorFormInputOuter">
						<button
							type="submit"
							className={`
								itemEditorButton
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


ItemEditor.propTypes = {
	item: PropTypes.object,
	files: PropTypes.array,
	metadata: PropTypes.array,
};


let ItemEditorForm = reduxForm({
	form: 'ItemEditor',
	enableReinitialize: true,
})(ItemEditor);

const selector = formValueSelector('ItemEditor') // <-- same as form name

const mapStateToProps = (state, props) => {
	const metadata = selector(state, 'metadata')

	return {
		metadata,
	};
};

ItemEditorForm = connect(
	mapStateToProps
)(ItemEditorForm);

export default ItemEditorForm;
