import React from "react";
import CustomButton from "../components/CustomButton";
import { QuestionModal } from "../components/Modals";

const Unnecessary = () => {

  //Modal stuff will be shifted
  // modal indicators
  const [modal, setModal] = React.useState(0);
  const handleClose = () => setModal(0);

  const handleQuestionModal = (event) => {
    console.log("Modal opened")
    setModal(1)
    console.log(modal)
}


  return (<>
     Modal stuff oopss
                <CustomButton onClick={handleQuestionModal}>
                  Open Question Modal
                </CustomButton>
                <QuestionModal handleClose={handleClose} open={modal===1}/>
  </>)
};

export default Unnecessary;