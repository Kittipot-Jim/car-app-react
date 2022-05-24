import Carousel from "react-bootstrap/Carousel";

export default function Home() {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 bg-secondary"
            style={{ height: "445px" }}
            src="Image1"
            alt="First slide"
          />
          <Carousel.Caption>
            <h5>First slide label</h5>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 bg-secondary"
            style={{ height: "445px" }}
            src="Image2"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h5>Second slide label</h5>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 bg-secondary"
            style={{ height: "445px" }}
            src="Image3"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h5>Third slide label</h5>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className="container pt-5">Content</div>
    </div>
  );
}
