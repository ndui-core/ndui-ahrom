import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  label?: string;
  error?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
  label,
  error,
  className = ''
}) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      
      <div className={`
        border rounded-lg p-4
        ${error ? 'border-error' : 'border-base-300'}
        ${className}
      `}>
        <div className="btn-group mb-4">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`btn btn-sm ${editor.isActive('bold') ? 'btn-active' : ''}`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`btn btn-sm ${editor.isActive('italic') ? 'btn-active' : ''}`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`btn btn-sm ${editor.isActive('bulletList') ? 'btn-active' : ''}`}
          >
            Bullet List
          </button>
        </div>
        
        <EditorContent editor={editor} />
      </div>
      
      {error && (
        <label className="label">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
};

export default RichTextEditor;