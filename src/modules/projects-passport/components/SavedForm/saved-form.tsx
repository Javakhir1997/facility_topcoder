interface savedFormProps{
    text:string
}
export default function SavedForm({ text }: savedFormProps) {
  return (
    <div
      style={{
        background: "#18db4c",
        color: "white",
        padding: "10px 20px",
        borderRadius: "6px",
        fontSize: "20px",
        fontFamily: `"Inter-Regular", sans-serif`,
      }}
    >
      ✅ {text}
    </div>
  );
}
