import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { db } from '../../firebase';

// isOpen : 모달 열려있는지 여부
// onClose : 모달 닫기
// children : 모달 안에 들어갈 내용

const Modal = ({isOpen, onClose, modalPosition, postId}) => {
  const navigate = useNavigate();

  if(!isOpen) return null;

  const handleUpdateClick = () => {
    navigate(`/update/${postId}`);
  }

  const handleDeleteClick = async () => {
    try{
      await deleteDoc(doc(db, 'posts', postId));
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <ModalOverlay onClick={onClose}>
      <ModalBox
        style={{
          position: "absolute",
          top: `${modalPosition.top}px`,
          left: `${modalPosition.left}px`,
        }} 
        onClick={(e)=>e.stopPropagation()}>
        {/* children */}
        <UpdateButton onClick={handleUpdateClick}>수정</UpdateButton>
        <DelButton onClick={handleDeleteClick}>삭제</DelButton>
        <EndButton>모집 마감</EndButton>
      </ModalBox>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  /* visibility: hidden; */
   position : fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: inset;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpdateButton = styled.div`
  cursor: pointer;
  border: 0;
  padding: 15px 15px 10px 15px;
`;

const DelButton = styled.div`
  cursor: pointer;
  border: 0;
  padding: 10px 20px 10px 20px;
  border-top: 1px solid #e9e9e9;
  border-bottom: 1px solid #e9e9e9;
`;

const EndButton = styled.div`
  cursor: pointer;
  border: 0;
  padding: 10px 15px 15px 15px;
`;