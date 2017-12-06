import React from 'react';
import {
  Grid,
  Row,
  Col,
  Button,
  NavItem,
  Navbar,
  Nav
} from 'react-bootstrap';
import { Link } from 'react-router';

import '../../../../components/navigation/Footer/Footer.css';
import './ProjectFooter.css';

export default class Footer extends React.Component {
	render() {
		const now = new Date();
		const year = now.getFullYear();

		return (
			<section id="footer" className="projectFooter">
				<Grid>
					<Row>
						<Col>
							<ul className="projectFooterNav" role="nav">
								<li>
									<Link
										to="/terms"
									>
										Terms
									</Link>
								</li>
								<li>
									<Link
										to="/privacy"
									>
										Privacy
									</Link>
								</li>
							</ul>
						</Col>
					</Row>
					<Row>
						<Col>
              <span className="footerCopyright">
								© Copyright Example Project, {year}
							</span>
						</Col>
					</Row>
				</Grid>
			</section>
		);
	}
}
