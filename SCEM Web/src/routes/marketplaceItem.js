import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from "firebase/firestore";
import {  auth, firestore } from "../firebase";
import "../css/marketplaceItem.css";
import {onAuthStateChanged} from "firebase/auth";

const MarketplaceItem = () => {
  const location = useLocation();
  const [itemData, setItemData] = useState(null);
  const [reviewData, setReviewData] = useState({
    name: "",
    review: "",
    rating: 0,
    timestamp: null,
  });
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    const path = location.pathname;
    const getData = async () => {
      try {
        const docRef = doc(firestore, "marketplace", path.slice(12));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setItemData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error retrieving document:", error);
      }
    };

    getData();
  }, [location]);

  useEffect(() => {
    const checkAuthState = async () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          setUserID(user.uid);
          setAuthState(true);
          const ref = collection(firestore, "users");
          const q = query(ref, where("email", "==", user.email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            if (!userName) {
              setUserName(doc.data().fullname);
            }
          });
        }
      });
    };

    checkAuthState();
  }, [userName]);

  const handleNameChange = (event) => {
    setReviewData({ ...reviewData, name: event.target.value });
  };

  const handleReviewChange = (event) => {
    setReviewData({ ...reviewData, review: event.target.value });
  };

  const handleRatingChange = (event) => {
    setReviewData({ ...reviewData, rating: parseInt(event.target.value) });
  };

  const submitReview = async (event) => {
    event.preventDefault();
    if (!reviewData.review ||  !reviewData.rating) {
      return; // Don't submit empty reviews, names, or ratings
    }
  
    try {
      const path = location.pathname;
      const docRef = doc(firestore, "marketplace", path.slice(12));
      await updateDoc(docRef, {
        reviews: [
          ...(itemData.reviews || []),
          {
            name: userName,
            review: reviewData.review,
            rating: reviewData.rating,
            timestamp: new Date().toISOString(),
          },
        ],
      });
      setReviewData((prevReviewData) => ({
        ...prevReviewData,
        review: "",
        rating: 0,
      }));
  
      // Fetch the updated data from Firestore and update the state
      const updatedDocSnap = await getDoc(docRef);
      if (updatedDocSnap.exists()) {
        const updatedData = updatedDocSnap.data();
        setItemData(updatedData);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  
  

  const renderStars = (rating) => {
  const filledStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return <span className="star">{filledStars + emptyStars}</span>;
};


  return (
    <div className="container">
      {itemData ? (
        <div className="content">
          <div className="blue-box">
            <h2>{itemData.name}</h2>
          </div>
          <div className="item-details">
          <p className="item-image">
    <img
      src={itemData.images}
      alt="Marketplace Item"
      id="marketplace-marketplaceItemImage"
    />
  </p>
  <p>{itemData.description}</p>
  <p>
    <span className="price"><strong>{itemData.dailyPrice}$/per day </strong></span>
    <br />
    <span className="price"><strong>{itemData.weeklyPrice}$/per week </strong> </span>
    <br />
    <span className="price"><strong>{itemData.monthlyPrice}$/per month </strong> </span>
  </p>
  <p>
    <strong>Owner</strong> <br></br> {itemData.userCreated}
  </p>
  {/* Render other properties */}
  {/* Render other item details */}
</div>

          <div className="reviews">
            <h3>Reviews</h3>
            <ul className="review-list">
              {itemData.reviews &&
                itemData.reviews.map((review, index) => (
                  <li key={index} className="review-item">
                    <div className="review-box">
                      <strong>{review.name}: </strong>
                      {review.review}
                      <br />
                      Rating: {renderStars(review.rating)}
                      <br />
                      Time: {new Date(review.timestamp).toLocaleString()}
                    </div>
                  </li>
                ))}
            </ul>
            <form className="review-form" onSubmit={submitReview}>
              <input
                className="name-input"
                type="text"
                value={authState ? userName : reviewData.name}
                onChange={handleNameChange}
                placeholder="Enter your name"
              />
              <input
                className="review-input"
                type="text"
                value={reviewData.review}
                onChange={handleReviewChange}
                placeholder="Write a review"
              />
              <input
                className="rating-input"
                type="number"
                min={1}
                max={5}
                value={reviewData.rating}
                onChange={handleRatingChange}
                placeholder="Rating (1-5)"
              />
              <button className="review-submit" type="submit">
                Review
              </button>
            </form>
          </div>
          <button className="rent-submit" type="submit">
                Rent
              </button>
        </div>
        
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default MarketplaceItem;
