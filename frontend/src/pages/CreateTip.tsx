import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeIcon from "../components/WelcomeIcon";
import axios from "axios";
import { useThemeContext } from "../contexts/ThemeContext";
import toast from "react-hot-toast";
import { themeConfig } from "../config/theme.config";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function CreateTip() {
  const navigate = useNavigate();
  const { isDeath } = useThemeContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const theme = themeConfig[isDeath ? "death" : "life"];

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().startsWith("#")
        ? tagInput.trim()
        : `#${tagInput.trim()}`;
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        toast.error("Please login first");
        navigate("/login");
        return;
      }

      const response = await axios.post(`${API_URL}/tips`, {
        title,
        type: isDeath ? "DEATH" : "LIFE",
        authorId: userId,
        description: description || title,
        content,
        tags,
      });

      toast.success("Tip created successfully!");
      navigate(`/tip/${response.data.tipId}`);
    } catch (error) {
      console.error("Failed to create tip:", error);
      toast.error("Failed to create tip");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`flex min-h-screen flex-col items-center ${theme.background}`}
    >
      {/* Header Section */}
      <div
        id="tip-header-container"
        className="mb-6 mt-10 flex w-3/5 items-center justify-between"
      >
        <a
          href="/"
          className={`inline-block text-lg underline underline-offset-4 ${theme.secondaryText}`}
        >
          &lt; Back to Home
        </a>

        <WelcomeIcon />
      </div>

      {/* Input Section */}
      <div className="w-1/2">
        {/* Title Input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Please enter a title"
          className={`mb-4 h-12 w-full rounded-lg border px-4 focus:outline-none ${theme.background} ${
            theme.text
          } ${theme.borderColor} ${theme.placeholder}`}
        />

        {/* Description Input */}
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Short description (optional)"
          className={`mb-4 h-12 w-full rounded-lg border px-4 focus:outline-none ${theme.background} ${
            theme.text
          } ${theme.borderColor} ${theme.placeholder}`}
        />

        {/* Tags Input */}
        <div className="mb-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className={`flex items-center gap-1 rounded-full px-2 py-1 text-sm ${
                  isDeath ? "bg-gray-800 text-gray-300" : "bg-gray-200"
                }`}
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className={`hover:${theme.accentText} font-bold`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tags (press Enter to add)"
            className={`h-12 w-full rounded-lg border px-4 focus:outline-none ${theme.background} ${
              theme.text
            } ${theme.borderColor} ${theme.placeholder}`}
          />
        </div>

        {/* Content Input */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your tip content here..."
          className={`mb-2 h-80 w-full resize-none rounded-lg border px-4 py-2 focus:outline-none ${
            theme.background
          } ${theme.text} ${theme.borderColor} ${theme.placeholder}`}
        />

        {/* Publish Button */}
        <div className="relative">
          <div
            className={`absolute left-1 top-1 rounded-lg ${theme.text}`}
            style={{ width: "105px", height: "48px" }}
          ></div>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`relative rounded-lg px-6 py-3 font-bold ${theme.accent} text-white hover:opacity-90 disabled:opacity-50`}
          >
            {isSubmitting ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
}
