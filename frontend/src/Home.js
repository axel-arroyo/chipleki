import pic from './images/pic.png';
import {Row} from 'react-bootstrap';

function Home() {
    return(
        <div>
            <Row>
            <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1" data-aos="fade-up" data-aos-delay="200">
                <h1>Insertar título</h1>
                <h2>Insertar descripción</h2>
            </div>
                <img src={pic} className="img-fluid animated col-lg-6 order-1 order-lg-2" alt="" />
            </Row>

            <div className="footer">
                Chipleki Chipleki &reg;
            </div>
        </div>
    );

}

export default Home;