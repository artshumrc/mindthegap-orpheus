import React from 'react';

const getBackgroundPosition = () => {


}


class CoverBackground extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			transform: `translate(-1%, -2%)`,
		};
	}

	translateBackground(e) {
		const { reactsToMouse } = this.props;

		if (reactsToMouse) {
			let x = e.pageX / window.innerHeight;
			x = x * -2;
			let y = e.pageY / window.innerHeight;
			y = y * -4;

			this.setState({
				transform:  `translate(${x}%, ${y}%)`,
			});
		}
	}

	render() {
		const { transform } = this.state;

		return (
			<div
				className="cover-background"
				onMouseMove={this.translateBackground.bind(this)}
				style={{
					transform,
				}}
			>
				{this.props.children}
			</div>
		)
	}
}

export default CoverBackground;
