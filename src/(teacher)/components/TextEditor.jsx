import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default function TextEditor({ onChange, defaultValue }) {
  const editorRef = useRef(null);
  const quillInstance = useRef(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Fill your subject content here',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ align: [] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        },
      });

      // Set default content
      if (defaultValue) {
        quillInstance.current.clipboard.dangerouslyPasteHTML(defaultValue);
      }

      quillInstance.current.on('text-change', () => {
        const html = quillInstance.current.root.innerHTML;
        if (onChange) {
          onChange(html);
        }
      });
    }
  }, [onChange, defaultValue]);

  return <div ref={editorRef} />;
}
