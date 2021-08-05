import React from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const CarouselNav1Prev = (onClickHandler, hasPrev, label) =>
    hasPrev && (
        <button type="button" className={`carousel-nav prev`} onClick={onClickHandler}>
            <FaAngleLeft/>
        </button>
    )

const CarouselNav1Next = (onClickHandler, hasNext, label) =>
    hasNext && (
        <button type="button" className={`carousel-nav next`} onClick={onClickHandler}>
            <FaAngleRight/>
        </button>
    )

export { CarouselNav1Prev, CarouselNav1Next };

// export default CarouselNav1
