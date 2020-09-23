import React, { useState, useEffect } from "react";
import "./Like.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import AssumptionModal from "../Modal/AssumptionModal";
import CountModal from "../CountModal/CountModal";
import { getUser } from "../../API/axios";
import { Alert } from "reactstrap";

const Like = (props) => {
  var supports = null;
  console.log(props);
  var {
    assumptionId,
    userId,
    assumptionCredits,
    assumptionSupport,
    assumption,
  } = props;
  console.log(assumption);

  
  const [modalShow, setModalShow] = useState(false);
  

  var [count, setCount] = useState(0);
  var [countModal, setCountModal] = useState(false);
  var [showAlert, setShowAlert] = useState(false);

  console.log(assumption);
  supports = assumption.credits.filter((x) => x.credit.support === true);
  console.log(assumption.credits.map((ass) => ass.reactor));
  console.log(supports.length);

  useEffect(() => {
    setCount(supports.length);
  }, []);

  var openModal = () => {
    let index = assumption.credits.findIndex((x) => x.reactor._id == userId);
    if (index == -1) {
      setModalShow(true);
    } else {
      setShowAlert(true);
      setModalShow(false);
    }
  };

  var handleUpdatedCount = (updatedCount) => {
    window.location.reload();
  };
  // console.log(showModal);

  return (
    <div className="flex">
      <FontAwesomeIcon
        className="like"
        icon={faThumbsUp}
        size="1x"
        onClick={openModal}
      />
      {/* {
  showAlert === true &&   
  <Alert color="primary">
  This is a primary alert — check it out!
</Alert>
} */}
      {modalShow && (
        <AssumptionModal
          show={modalShow}
          support={true}
          assumptionId={assumptionId}
          assumption={assumption}
          userId={userId}
          handleUpdatedCount={handleUpdatedCount}
          onHide={() => setModalShow(false)}
        />
      )}

      <div
        onClick={() => setCountModal(true)}
        style={{ paddingLeft: "0.5rem", transform: "translateY(0.15rem)", cursor: 'pointer' }}
      >
        {count}
      </div>
      {countModal && (
        <CountModal
          show={countModal}
          count={count}
          supports={supports}
          assumptionCredits={assumptionCredits}
          assumptionId={assumptionId}
          userId={userId}
          assumption={assumption}
          onHide={() => setCountModal(false)}
        />
      )}
    </div>
  );
};

export default Like;
