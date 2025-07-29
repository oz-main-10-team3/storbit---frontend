import CommonModal from '../common/CommonModal';
interface TestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TestModal = ({ isOpen, onClose }: TestModalProps) => {
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={onClose}
      title="테스트 모달"
      subtitle="공통 모달이 잘 뜨는지 확인!"
    >
      {/* 모달 내부 콘텐츠만 정의하면 됨 */}
      <button
        className="px-4 py-2 bg-[#8349FF] text-white rounded"
        onClick={onClose}
      >
        닫기
      </button>
    </CommonModal>
  );
};

export default TestModal;