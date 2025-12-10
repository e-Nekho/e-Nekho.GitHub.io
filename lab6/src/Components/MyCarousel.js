import React from 'react';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './MyCarousel.css';

const MyCarousel = ({ images = [] }) => {
    // Кастомные стрелки
    const SampleNextArrow = (props) => {
        const { className, style, onClick, currentSlide, slideCount } = props;
        return (
            <div
                className={`${className} custom-arrow`}
                style={{
                    ...style,
                    display: 'block', // Важно: должно быть block
                    zIndex: 10,
                }}
                onClick={onClick}
            >
                <div className="arrow-content">
                    <RightOutlined />
                </div>
            </div>
        );
    };

    const SamplePrevArrow = (props) => {
        const { className, style, onClick, currentSlide, slideCount } = props;
        return (
            <div
                className={`${className} custom-arrow`}
                style={{
                    ...style,
                    display: 'block', // Важно: должно быть block
                    zIndex: 10,
                }}
                onClick={onClick}
            >
                <div className="arrow-content">
                    <LeftOutlined />
                </div>
            </div>
        );
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        dotsClass: 'nature-dots',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    arrows: true,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    dots: true,
                }
            }
        ]
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
                                <h3>Природа #{index + 1}</h3>
                                <p>Исследуйте красоту мира</p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default MyCarousel;