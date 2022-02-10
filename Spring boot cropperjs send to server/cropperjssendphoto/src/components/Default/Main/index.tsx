import { Col, Row } from "antd";
import React from "react";
import { Link } from "react-router-dom";


const Main:React.FC = () => 
{
    return (<>
        <Row>
            <Col md={12} offset={6}>
                <h1>Main Page</h1>
                <Link to="/admin">Адміністратор</Link>
            </Col>
        </Row>
    </>);
}

export default Main;