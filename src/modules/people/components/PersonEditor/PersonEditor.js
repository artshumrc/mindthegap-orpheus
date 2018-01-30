import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ItemEditorUploader from '../../../dashboard/components/ItemEditorUploader';
import { required, maxLength } from '../../../../lib/formHelpers';
import MetadataFields from '../../../items/components/MetadataFields';

import './PersonEditor.css';


const maxLength200 = maxLength(200);
const maxLength200000 = maxLength(200000);


class PersonEditor extends React.Component {

	render() {
		const { item, files, metadata } = this.props;

		return (
			<div className="personEditor">

				<div className="personEditorHead">
					<h1>{item ? 'Edit' : 'Create'} Item</h1>

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
						<label>Title</label>
						<Field
							name="title"
							type="text"
							component="input"
							placeholder="Your item title"
							validate={[required, maxLength200]}
						/>
						<span
							className="personEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="personEditorFormInputOuter personEditorFormDescriptionOuter">
						<label>Enter a description of your item.</label>
						<Field
							name="description"
							type="text"
							component="textarea"
							placeholder="Example description of item . . . "
							validate={[maxLength200000]}
						/>
						<span
							className="personEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="personEditorFormInputOuter personEditorFormInputOuterMetadata">
						<label>Enter metadata for this item.</label>
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
	item: PropTypes.object,
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
