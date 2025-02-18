import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '../Button/Button';

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
        <div className="flex gap-2 mb-4">
          <Button
            size="sm"
            variant={editor.isActive('bold') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            Bold
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('italic') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            Italic
          </Button>
          <Button
            size="sm"
            variant={editor.isActive('bulletList') ? 'primary' : 'ghost'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            Bullet List
          </Button>
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