import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './MyCarousel.css';

const MyCarousel = ({ images = [] }) => {
    // Настройки для стрелок
    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    right: '-60px',
                    fontSize: '24px',
                    color: '#2d5016',
                    zIndex: 10,
                }}
                onClick={onClick}
            >
                <RightOutlined />
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    left: '-60px',
                    fontSize: '24px',
                    color: '#2d5016',
                    zIndex: 10,
                }}
                onClick={onClick}
            >
                <LeftOutlined />
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dotsClass: 'nature-dots',
    };

    return (
        <div className="nature-carousel-wrapper">
            <Carousel {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="nature-slide">
                        <div className="image-frame">
                            <img 
                                src={image.url}
                                alt={`Природный пейзаж ${index + 1}`}
                                className="nature-image"
                            />
                            <div className="image-overlay">
                                <h3>Природная гармония</h3>
                                <p>Фото {index + 1} из {images.length}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default MyCarousel;