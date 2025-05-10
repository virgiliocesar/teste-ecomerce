
const RatingStars = ({rating}) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <i key={i} className={`ri-star${i <= rating ? '-fill' : '-line'}`}/>

        )
    }

    return (
        <div className="product__rating">{stars}</div>
    )
}

export default RatingStars