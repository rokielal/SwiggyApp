const RestaurantCard = (props) => {
  const { resData } = props;
  return (
    <div className="res-card">
      <img className="res-logo" src={resData.image} alt="res-logo" />
      <div className="card-details">
        <h2>{resData.name}</h2>
        <h4>{resData.city}</h4>
        <h4>{resData.ratings} stars</h4>
        <h4>
          Rs.{resData.delivery_price}.00
        </h4>
        <p>{resData.tags.join(", ")}</p>
      </div>
    </div>
  );
};



export default RestaurantCard;
