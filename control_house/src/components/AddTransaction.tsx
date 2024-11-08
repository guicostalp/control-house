import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TransForm from '@/components/TransForm'

const AddTransaction: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleIconClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Clickable Icon */}
      <button onClick={handleIconClick} style={iconStyle}>
        <AddCircleOutlineIcon sx={{fontSize: "38px", cursor:"pointer"}} />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div style={overlayStyle} onClick={handleClose}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <button onClick={handleClose} style={closeButtonStyle}>
              ✖️
            </button>
            <div>
              <h2>Add Transaction</h2>
              <p>This is a centered modal that takes 40% of the screen size.</p>


              <TransForm closeModal={handleClose}/>

              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Icon style
const iconStyle: React.CSSProperties = {
  fontSize: '2rem', // Adjust the size of the icon as needed
  cursor: 'pointer',
  border: 'none',
  color: 'white',
  backgroundColor: 'transparent',
};

// Overlay style for modal background
const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

// Modal style (40% screen width and centered)
const modalStyle: React.CSSProperties = {
  backgroundColor: 'white',
  width: '35vw', // 40% of the viewport width
  height: '44vh', // 40% of the viewport width
  padding: '20px',
  borderRadius: '10px',
  textAlign: 'center',
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  position: 'relative',
};

// Close button style
const closeButtonStyle: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  background: 'transparent',
  border: 'none',
  fontSize: '1.5rem',
  cursor: 'pointer',
};

export default AddTransaction;
