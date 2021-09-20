import React from "react";
import CustomButton from "../components/CustomButton";
import { QuestionModal,BreakModal,SummaryExtentModal, ChallengeModal } from "../components/Modals";

const Unnecessary = () => {

  //Modal stuff will be shifted
  // modal indicators
  const [modal, setModal] = React.useState(0);
  const handleClose = () => setModal(0);

  const handleQuestionModal = (event) => {
    setModal(1)
}

const handleBreakModal = (event) => {
    setModal(2)
}

const handleSummaryExtentModal = (event) => {
    setModal(3)
}

const handleChallengeModal = (event) => {
    setModal(4)
}


  return (<>
     Modal stuff oopss
                <CustomButton onClick={handleQuestionModal}>
                  Open Question Modal
                </CustomButton>
                <CustomButton onClick={handleBreakModal}>
                  Open Break Modal
                </CustomButton>
                <CustomButton onClick={handleSummaryExtentModal}>
                  Open Summary Extent Modal
                </CustomButton>
                <CustomButton onClick={handleChallengeModal}>
                  Open Challenge Modal
                </CustomButton>

                <QuestionModal handleClose={handleClose} open={modal===1}/>
                <BreakModal handleClose={handleClose} open={modal===2}/>
                <SummaryExtentModal handleClose={handleClose} open={modal===3}/>
                <ChallengeModal handleClose={handleClose} open={modal===4}/>
  </>)
};

export default Unnecessary;