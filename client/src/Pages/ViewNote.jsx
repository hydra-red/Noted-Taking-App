import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axiosInstance from "../lib/axios.js";
import toast from "react-hot-toast";
import { LoaderIcon, ArrowLeftIcon, Trash2Icon } from "lucide-react";

function ViewNote() {
  const [note, setNote] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`);
        if (!res) {
          console.log("Error while fetching Note");
        }
        setNote(res.data.data);
      } catch (error) {
        toast.error("Error while getting Note");
        console.log("Error while getting note", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  async function handleDelete(){
    if(!window.confirm("Are you sure you want to Delete this Note")) return;

    try {
        await axiosInstance.delete(`/notes/${id}`);
        toast.success("Successfully deleted the Note")
        navigate("/")
    } catch (error) {
        console.log("Something went wrong while Deleting Note",error.message);
        toast.error("Error while deleting note")
    }
  }

async function handleSave(){
    if(!note.title.trim() || !note.content.trim()){
        toast.error("Empty feild! Please Enter data in the fields"); 
        return;
    }
    
    setSaving(true)

    try {
       const res = await axiosInstance.put(`/notes/${id}`,note)
        
       toast.success("Note Updated Successfully")
       navigate("/")
    } catch (error) {
        console.log("Error while deleting note",error.message)
        toast.error("Falied to delete Note")
    }finally{
        setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6 px-2">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>

            <button className="btn btn-error btn-outline" onClick={handleDelete}>
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100 w-full">
            <div className="card-body">

              <div className="form-control mb-4 flex flex-col">
                <label className="label pb-4">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered border-2 outline-0 focus:border-primary focus:border-2 w-full"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control mb-4 flex flex-col">
                <label className="label pb-4">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Note Content"
                  className="input input-bordered border-2 outline-0 focus:border-primary focus:border-2 w-full h-32"
                  value={note.content}
                  onChange={(e) => setNote({ ...note, content: e.target.value })}
                />
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                    {saving?"Saving":"Save"}
                </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewNote;
