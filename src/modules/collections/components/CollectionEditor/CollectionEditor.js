import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Grid, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

import Button from '../../../../components/common/buttons/Button';
import DashboardNav from '../../../dashboard/components/DashboardNav';
import CoverImageUploader from '../../../dashboard/components/CoverImageUploader';
import { required, maxLength } from '../../../../lib/formHelpers';

import './CollectionEditor.css';


const maxLength200 = maxLength(200);
const maxLength2100 = maxLength(2100);


class CollectionEditor extends React.Component {
	componentWillReceiveProps (nextProps) {
		if (
			(!this.props.collection && nextProps.collection)
		|| this.props.collection !== nextProps.collection
		) {
			this.props.destroy();
			this.props.initialize({ ...nextProps.collection });
		}
	}

	render() {
		const { collection, items, selectedItems } = this.props;

		return (
			<div className="collectionEditor">

				<h1>{collection ? 'Edit' : 'Create'} Collection</h1>

				<CoverImageUploader
					changeValue={this.props.changeImageValue}
					image={this.props.coverImage}
				/>

				<form
					className="collectionEditorForm"
					onSubmit={this.props.handleSubmit}
				>
					<div className="collectionEditorFormInputOuter collectionEditorFormTitleOuter">
						<label>Enter the title of the collection.</label>
						<Field
							name="title"
							type="text"
							component="input"
							placeholder="Your collection title"
							validate={[required, maxLength200]}
						/>
						<span
							className="collectionEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="collectionEditorFormInputOuter collectionEditorFormDescriptionOuter">
						<label>Enter a brief description of your collection.</label>
						<Field
							name="description"
							type="text"
							component="textarea"
							placeholder="Example description of collection . . . "
							validate={[required, maxLength2100]}
						/>
						<span
							className="collectionEditorFormHelp"
						>
							?
						</span>
					</div>

					<div className="collectionEditorFormInputOuter ">
						<Grid>
							<Row>
								<Col md={6}>
									<div className="collectionEditorItems">
										<label>
											Project Items <Link to="/items/create">Create a new item</Link>
										</label>
										<div className="collectionItemsTextsearch">
											<Field
												name="collectionItemsTextsearch"
												type="text"
												component="input"
												placeholder="Search..."
												validate={[required, maxLength2100]}
											/>
										</div>
										<div className="collectionEditorItemList">
											{items.map(item => (
												<div className="collectionItem">
													{item.title}
												</div>
											))}
										</div>
									</div>
								</Col>
								<Col md={6}>
									<div className="collectionEditorItems">
										<label>
											Selected
										</label>
										<div className="collectionEditorItemList collectionEditorItemListSelected">
											{selectedItems.map(item => (
												<div className="collectionItem">
													{item.title}
												</div>
											))}
										</div>
									</div>
								</Col>
							</Row>
						</Grid>

					</div>
					<button
						type="submit"
						className={`
							collectionEditorButton
						`}
					>
						Save
					</button>
				</form>
			</div>
		);
	}
}

CollectionEditor.propTypes = {
	collection: PropTypes.object,
	items: PropTypes.array,
	selectedItems: PropTypes.array,
	toggleSelectItem: PropTypes.func,
};

CollectionEditor.defaultProps = {
	collection: null,
	items: [],
	selectedItems: [],
};

export default reduxForm({
	form: 'CollectionEditor',
})(CollectionEditor);
