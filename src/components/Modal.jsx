import { useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';

const Modal = ({ showModal, setShowModal, children }) => {

  const onClose = () => {
    setShowModal(false)
  }
  

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (showModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [showModal, onClose]);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Scrollable container */}
      <div className="flex min-h-full items-start justify-center p-8">
          {/* Content area */}
          <div className='relative lg:min-w-[900px] md:min-w-[600px] max-sm:min-w-[300px]'>
          {/* Close button (scrolls with content) */}
          <Button
            onClick={onClose}
            className="absolute right-[-14px] top-[-14px] z-10 rounded-full max-md:size-6"
            size={'icon'}
             title="Close"
          >
            <X className="h-5 w-5" />
          </Button>
            {children}
          </div>
      </div>
    </div>
  );
};

export default Modal;