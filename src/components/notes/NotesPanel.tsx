import AddNoteForm from "./AddNoteForm"
import { Task } from "@/types/index";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
   notes: Task['notes']
}
function NotesPanel({notes}: NotesPanelProps) {
 
  if (notes.length === 0) {
    return <AddNoteForm />;
  }


  return (
    <>
    {notes.length > 0 && 
      <>
      <p className="text-md font-bold text-slate-400">Historial de cambios:</p>
      <hr className='border-b border-slate-200' />
      <div className="divide-y divide-gray-100">
        {notes.map((note, index) => (
            <NoteDetail key={note._id} index={index} note={note}  />
          ))}
      </div>
      </>
      }
      <AddNoteForm />
    </>
  )
}

export default NotesPanel