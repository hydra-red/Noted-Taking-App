import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { toast } from "react-hot-toast";
import axiosInstance from "../lib/axios";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Empty field. Please Enter some Value");
      return;
    }

    setLoading(true);

    try {
      let res = await axiosInstance.post("/notes", {
        title,
        content,
      });

      if (!res) return;

      toast.success("Note created Successfully!");

      navigate("/");
    } catch (error) {
      console.log("Error creating note", error);
      if (error.response?.status === 429) {
        toast.error("Too many request. Please try later", {
          duration: 4000,
          icon: "💀",
        });
      }else{
        toast.error("Something went wrong while creating Note")
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4 flex flex-col">
                  <label className="label">
                    <span className="label-text mb-3">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title..."
                    className="input input-bordered focus:outline-primary focus:outline-1  rounded-3xl focus:border-none w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-4 flex flex-col">
                  <label className="label">
                    <span className="label-text mb-3">Content</span>
                  </label>
                  <textarea
                    type="text"
                    placeholder="Note Content..."
                    className="textarea textarea-bordered focus:outline-primary focus:outline-1  rounded-3xl focus:border-none h-32 w-full"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Creating" : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
