// Upload.jsx

import { useEffect } from 'react';
import Uppy from '@uppy/core';
import DragDrop from '@uppy/drag-drop';

import '@uppy/core/dist/style.min.css';
import '@uppy/drag-drop/dist/style.min.css';

const Upload = () => {
  useEffect(() => {
    const uppy = Uppy().use(DragDrop, { target: '#drag-drop' });

    return () => {
      uppy.close();
    };
  }, []);

  return (
    <div id="drag-drop">
      {/* Your upload UI will be rendered here */}
    </div>
  );
};

export default Upload;
