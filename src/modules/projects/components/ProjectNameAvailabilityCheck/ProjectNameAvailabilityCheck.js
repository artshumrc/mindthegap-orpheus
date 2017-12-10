import React from 'react';
import Recaptcha from 'react-recaptcha';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Button from '../../../../components/common/buttons/Button';

import './ProjectNameAvailabilityCheck.css';


const required = value => value ? undefined : 'Required';
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength200 = maxLength(200)


class ProjectNameAvailabilityCheck extends React.Component {
	render() {

		return (
			<div className="projectNameAvailabilityCheck">
				<form
					className="projectNameAvailabilityForm"
					onSubmit={this.props.handleSubmit}
				>
					<div className="projectNameAvailabilityFormInputOuter projectNameAvailabilityFormTitleOuter">
						<label>What is your Organization's or Project's title?</label>
						<Field
							name="title"
							type="text"
							component="input"
							placeholder="Your Organization or Project"
							validate={[required, maxLength200]}
						/>
						<span
							className="projectNameAvailabilityFormHelp"
						>
							?
						</span>
					</div>

					<div
						className={`
							projectNameAvailabilityFormInputOuter
							projectNameAvailabilityFormURLOuter
							${this.props.projectFound ? 'projectNameUnavailable' : ''}
						`}
					>
						<div>
							<label>At what URL would you like users to access your project?</label>
							<Field
								name="hostname"
								type="text"
								component="input"
								placeholder="example"
								validate={[required, maxLength200]}
							/>
							<div className="projectNameAvailabilityFormURL">
								<span>
									.orphe.us
								</span>
							</div>
							<span
								className="projectNameAvailabilityFormHelp"
							>
								?
							</span>
						</div>
						<div>
							<span className={`nameNotAvailable ${this.props.projectFound ? 'nameNotAvailableVisible' : ''}`}>
								This URL is not available
							</span>
						</div>
					</div>


					<div className="projectCreateCaptcha">
						<Recaptcha
					    sitekey="6LcfAzwUAAAAAGE3A1yY_IAKDxaskRVuSiman8OS"
					    verifyCallback={this.props.verifyCaptcha}
					  />
					</div>

					<button
						type="submit"
						className={`
							projectNameAvaibilityButton
							${this.props.projectFound || !this.props.captchaVerified ? 'disabled' : ''}
						`}
					>
						Create
					</button>

				</form>
			</div>
		);
	}
}

export default reduxForm({
	form: 'ProjectNameAvailabilityCheck',
})(ProjectNameAvailabilityCheck);