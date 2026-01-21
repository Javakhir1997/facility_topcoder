const WordPreview = ({ url }: { url: string }) => {
  return (
    <div className="w-full h-[80vh] border border-gray-300 rounded-lg overflow-hidden">
      {/* 1. Iframe yordamida */}
      <iframe
        src={url}
        width="100%"
        height="100%"
        className="border-none"
        title="PDF Viewer"
      />
      
      {/* YOKI 2. Embed yordamida (Ba'zan yaxshiroq ishlaydi) */}
      {/* <embed src={url} type="application/pdf" width="100%" height="100%" /> */}
    </div>
  );
};

export default WordPreview;