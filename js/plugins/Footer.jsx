/*
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col } from 'react-bootstrap';
import src from "./attribution/geosolutions-brand.png";
import HTML from '@mapstore/components/I18N/HTML';
import lamma from "../assets/img/LogoLamma-hr.jpg";
import rt from "../assets/img/logo_rt.png";
import cnr from "../assets/img/logo_cnr_full.png";
import("../assets/css/footer.css");

/**
 * Footer plugin, section of the homepage.
 * description of footer can be overridden by
 * `home.footerDescription` message id in the translations
 * @prop {object} cfg.logo logo data to change image and href, set to null to hide the logo
 * @prop {object} cfg.logo.src source of the logo
 * @prop {object} cfg.logo.width width of the logo image
 * @prop {object} cfg.logo.height height of the logo image
 * @prop {object} cfg.logo.title title of the logo image
 * @prop {object} cfg.logo.alt alternative text of the logo image
 * @memberof plugins
 * @class
 * @name Footer
 */

class Footer extends React.Component {

    static propTypes = {
        logo: PropTypes.object
    };

    static defaultProps = {
        logo: {
            src,
            width: 140,
            height: 'auto',
            href: 'https://www.geosolutionsgroup.com/',
            title: 'GeoSolutions',
            alt: 'GeoSolutions'
        }
    };

    render() {
        const { href, ...logo } = this.props.logo || {};
        // const image = (
        //     <img
        //         src={logo.src}
        //         width={logo.width || 'auto'}
        //         height={logo.height || 'auto'}
        //         title={logo.title || ''}
        //         alt={logo.alt || ''} />
        // );
        return (
            <Grid>
                {logo && logo.src && <Row>
                    <Col xs={3} className="text-center">
                    </Col>
                    <Col xs={6} className="text-center">
                        <Col md={4} className="text-center">
                            <a href="https://www.lamma.toscana.it" target="_blank">
                                <img src={lamma} alt="Consorzio LaMMA" title="Consorzio LaMMA" style={{width: "130px"}}></img>
                            </a>
                        </Col>
                        <Col md={4} className="text-center">
                            <a href="https://www.cnr.it/" target="_blank">
                                <img src={cnr} alt="Consiglio Nazionale delle Ricerche" title="Consiglio Nazionale delle Ricerche" style={{width: "110px"}}></img>
                            </a>
                        </Col>
                        <Col md={4} className="text-center">
                            <a href="https://www.regione.toscana.it/" target="_blank">
                                <img src={rt} alt="Regione Toscana" title="Regione Toscana" style={{width: "130px"}}></img>
                            </a>
                        </Col>
                    </Col>
                    <Col xs={3} className="text-center">
                    </Col>
                </Row>}
                <Row>
                    <Col xs={12} className="text-center">
                        <HTML msgId="home.footerDescription"/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

export const FooterPlugin = Footer;
