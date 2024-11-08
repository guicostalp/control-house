import React from 'react';
import '../assets/css/NewsCard.css'

const NewsCard = () => {


  return (

    <>
      <div className='cards-container' style={{
        //border: "1px solid white",
        boxSizing: "border-box", // Ensures the border is included in the element's width and height
        width: "100%",
        height: "88%",
        backgroundColor: "transparent"
        
      }}>
        <div className='card' style={{
          //border: "1px solid white",
          boxSizing: "border-box",
          width: "100%",
          height: "100%",
          display: "grid", // Use CSS Grid
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columns of equal width
          gridTemplateRows: "repeat(2, 1fr)", // 2 rows of equal height
          gap: "10px", // Space between boxes
          padding: "10px" // Padding around the grid
        }}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} style={{
                backgroundColor: "transparent", // Light gray background
                border: "1px solid white", // Border for the boxes
                borderRadius: "1rem",
                display: "flex", // Flex to center the content
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}>
                Box {index + 1}
                <div className="image">Image</div>
                <div className="title">Title</div>
                <div className="description">Description</div>
              </div>
            ))}
        </div>
      </div>
    </>

  )
};

export default NewsCard;
