import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { PageLayout, PageTitle, Button } from "@app/components"; // Loyihangizdagi komponentlar
import { BUTTON_THEME } from "@app/shared"; // Loyihangizdagi konstantalar

const Index = () => {
  const navigate = useNavigate();

  // --- 1. TEST UCHUN URL ---
  // Hozircha shu yerdan olyapti. Keyinchalik useQuery bilan backenddan olasiz.
  const url = 'https://dxsh.technocorp.uz/media/attachments/deal_87_DvQk8Rt.pdf';
  
  // Test uchun Word varianti (tekshirib ko'rish uchun kommentdan oling):
  // const url = 'https://dxsh.technocorp.uz/media/attachments/deal_87_OoA0BYr.docx';

  // --- 2. LOGIKA ---
  const { extension, isPdf } = useMemo(() => {
    if (!url) return { extension: "", isPdf: false };

    // URL dan toza kengaytmani olish (masalan: pdf, docx)
    const ext = url.split(/[#?]/)[0].split(".").pop()?.trim().toLowerCase();
    
    return { 
      extension: ext, 
      isPdf: ext === "pdf" 
    };
  }, [url]);

  return (
    <PageLayout>
      <PageTitle title="Hujjatni ko'rish">
        <Button 
            theme={BUTTON_THEME.OUTLINE} 
            onClick={() => navigate(-1)} // Orqaga qaytish
        >
          Orqaga
        </Button>
      </PageTitle>

      <div className="mt-4 w-full h-[85vh] bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
        
        {/* 3. AGAR PDF BO'LSA -> IFRAME (BRAUZERNING O'ZI OCHADI) */}
        {isPdf ? (
          <iframe
            src={url}
            width="100%"
            height="100%"
            title="PDF Viewer"
            className="w-full h-full border-none"
          />
        ) : (
          
        /* 4. AGAR WORD/EXCEL BO'LSA -> DOC VIEWER */
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={[{ uri: url, fileType: extension }]}
            style={{ height: "100%" }}
            // config={{
            //   header: {
            //     disableHeader: true,
            //     disableFileName: true,
            //     retainURLParams: true,
            //   },
            // }}
            theme={{
            //   primary:="#5296d8",
            //   secondary: "#ffffff",
            //   tertiary: "#5296d899",
            //   text_primary: "#ffffff",
            //   text_secondary: "#5296d8",
            //   text_tertiary: "#00000099",
            //   disableThemeScrollbar: false,
            }}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Index;