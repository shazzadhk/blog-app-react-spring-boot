import './App.css';
import {Container,Row,Col} from 'react-bootstrap';

function App() {
  return (
    <>
        <Container>
            <Row>
                <Col style={{height:'100px'}} sm={12}>sm=12</Col>
                {/*<Col sm={4}>sm=4</Col>*/}
            </Row>
            <Row>
                <Col sm={8}>sm=8</Col>
                <Col sm={4}>sm=4</Col>
            </Row>
        </Container>
    </>
  );
}

export default App;
