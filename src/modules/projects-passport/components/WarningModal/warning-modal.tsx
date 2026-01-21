import { Button } from "@components/index";
import { BUTTON_THEME } from "@shared/constants";
import { useTranslation } from "react-i18next";

interface PermissionModalProps {
  text: string;
  handleWarning: (arg: boolean) => void;
}

export default function WarningModal({ 
  text,
  handleWarning,
}: PermissionModalProps) {
  const {t}=useTranslation()
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
          height: "",
        }}
      >
        <p
          style={{
            marginBottom: "30px",
            fontSize: "22px",
            fontFamily: '"Inter-Regular", sans-serif',
            lineHeight:"35px"
          }}
        >
          {t(`${text}`)}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

          <Button
            type="button"
            theme={BUTTON_THEME.PRIMARY_OUTLINE}
            onClick={() => handleWarning(false)}
          >
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
