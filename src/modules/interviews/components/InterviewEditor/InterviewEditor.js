import React from 'react';
import PropTypes from 'prop-types';
import { Field, FieldArray, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';

import ItemEditorUploader from '../../../dashboard/components/ItemEditorUploader';
import { required, maxLength } from '../../../../lib/formHelpers';
import MetadataFields from '../../../items/components/MetadataFields';

import './InterviewEditor.css';


const maxLength200 = maxLength(200);
const maxLength200000 = maxLength(200000);


class InterviewEditor extends React.Component {

	render() {
		const { interview, files, metadata } = this.props;

		return (
			<div className="interviewEditor">

				<div className="interviewEditorHead">
					<h1>{interview ? 'Edit' : 'Create'} Interview</h1>

					<ItemEditorUploader
						files={files}
						addFile={this.props.addFile}
						removeFile={this.props.removeFile}
						onSortEnd={this.props.onSortEnd}
						updateFile={this.props.updateFile}
					/>
				</div>

				<form
					className="interviewEditorForm"
					onSubmit={this.props.handleSubmit}
				>
					<div className="interviewEditorFormInputOuter interviewEditorFormTitleOuter">
						<label>Title</label>
						<Field
							name="title"
							type="text"
							component="input"
							placeholder="Your interview title"
							validate={[required, maxLength200]}
						/>
						<span
							className="interviewEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="interviewEditorFormInputOuter interviewEditorFormDescriptionOuter">
						<label>Enter a description of your interview.</label>
						<Field
							name="description"
							type="text"
							component="textarea"
							placeholder="Example description of interview . . . "
							validate={[maxLength200000]}
						/>
						<span
							className="interviewEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="interviewEditorFormInputOuter interviewEditorFormInputOuterMetadata">
						<label>Enter metadata for this interview.</label>
						<FieldArray
							name="metadata"
							component={MetadataFields}
							metadata={metadata}
							handleUpdateMetadata={this.props.handleUpdateMetadata}
						/>
					</div>


					<div className="interviewEditorFormInputOuter">
						<button
							type="submit"
							className={`
								interviewEditorButton
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


InterviewEditor.propTypes = {
	interview: PropTypes.object,
	files: PropTypes.array,
	metadata: PropTypes.array,
};


let InterviewEditorForm = reduxForm({
	form: 'InterviewEditor',
	enableReinitialize: true,
})(InterviewEditor);

const selector = formValueSelector('InterviewEditor') // <-- same as form name

const mapStateToProps = (state, props) => {
	const metadata = selector(state, 'metadata')

	return {
		metadata,
	};
};

InterviewEditorForm = connect(
	mapStateToProps
)(InterviewEditorForm);

export default InterviewEditorForm;
