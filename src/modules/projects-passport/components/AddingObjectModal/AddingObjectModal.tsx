import { Button, Input } from "@components/index";
import { useAddProjectPlanObject } from "@modules/projects-passport/hooks";
import { BUTTON_THEME } from "@shared/constants";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface AddingObjectModalProps {
  text: string;
  handleShowModal: (arg: boolean) => void;
}

export default function AddingObjectModal({
  text,
  handleShowModal,
}: AddingObjectModalProps) {
  const { t } = useTranslation();
  const useAddProjectPlanData = useAddProjectPlanObject();
  const [objectName, setObjectName] = useState("");
  const [error, setError] = useState("");
  function handleAddObject() {
    if (objectName.length === 0) {
      setError("This field is required");
      return
    }
    useAddProjectPlanData.addProjectPlanObject({
      id: Math.random(),
      name: objectName,
    });
    setTimeout(() => {
      handleShowModal(false);
    }, 300);
  }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          textAlign: "center",
        }}
      >
        <p
          style={{
            marginBottom: "30px",
            fontSize: "22px",
            fontFamily: '"Inter-Regular", sans-serif',
          }}
        >
          {t(`${text}`)}
        </p>
        <div style={{ width: "100%" }}>
          <Input
            id="input-object"
            label="Enter object name"
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            error={error}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <Button
            type="button"
            theme={BUTTON_THEME.DANGER}
            onClick={() => handleShowModal(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            theme={BUTTON_THEME.PRIMARY}
            onClick={() => {
              handleAddObject();
            }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
