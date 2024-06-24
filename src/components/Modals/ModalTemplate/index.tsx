const ModalTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-30">
      {children}
    </div>
  );
};

export default ModalTemplate;
